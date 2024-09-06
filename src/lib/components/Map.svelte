<svelte:options accessors={true} />

<script lang="ts">
	import type { Popup as MLPopup, Map as MLMap } from 'maplibre-gl';
	import { base } from '$app/paths';
	import { tick } from 'svelte';
	import {
		MapLibre,
		GeoJSON,
		FillLayer,
		MarkerLayer,
		Popup,
		hoverStateFilter
	} from 'svelte-maplibre';
	import type { AppDataType, LangType } from '$lib';
	import AssetPopup from './AssetPopup.svelte';
	import ClusterPopup from './ClusterPopup.svelte';

	export let data: AppDataType;
	export let lang: LangType;

	const orange = '#FF5B00';
	let map: MLMap;
	let loaded = false;
	let currentPopUp: MLPopup | null = null;

	function refinePopupPosition() {
		if (!currentPopUp) return;
		// add extra transforms to the popup's div to keep it in view
		const popupBcr = currentPopUp._container.getBoundingClientRect();
		const mapBcr = map._canvas.getBoundingClientRect();

		const x0 = popupBcr.x - mapBcr.x;
		const x1 = x0 + popupBcr.width;
		const y0 = popupBcr.y - mapBcr.y;
		const y1 = y0 + popupBcr.height;

		const extraTransforms: string[] = [];

		if (x0 < 0) {
			extraTransforms.push(`translateX(${x0 * -1 + 2}px)`);
		} else if (x1 > mapBcr.width) {
			extraTransforms.push(`translateX(${mapBcr.width - x1 - 2}px)`);
		}
		if (y0 < 0) {
			extraTransforms.push(`translateY(${y0 * -1 + 2}px)`);
		} else if (y1 > mapBcr.height) {
			extraTransforms.push(`translateY(${mapBcr.height - y1 - 2}px)`);
		}
		currentPopUp._container.style.transform += ' ' + extraTransforms.join(' ');
	}

	function onPopupOpen(e: CustomEvent) {
		currentPopUp?._closeButton.click();
		tick().then(() => {
			// without the tick, onPopupClose will set currentPopUp to null,
			// so thet we will not be able to close it on next, new popup
			currentPopUp = e.detail;
			refinePopupPosition();
		});
	}

	function onPopupClose() {
		currentPopUp = null;
	}

	// // I've tried to make country borders more contrasting,
	// // but bitchy tile providers made borders inside sovereign Ukrainian territory
	// $: if (map && loaded) {
	// 	const layerIds = ['boundary_country_inner', ];
	// 	for (const id of layerIds) {
	// 		map.setPaintProperty(id, 'line-color', orange);
	// 		map.setPaintProperty(id, 'line-opacity', 0.3);
	// 		map.setPaintProperty(id, 'line-width', 1);
	// 	}
	// }
</script>

<MapLibre
	class="assets-map"
	style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
	standardControls
	center={[7, 47]}
	zoom={4}
	minZoom={2}
	bind:map
	bind:loaded
>
	<GeoJSON id="countries" data={data.countries} promoteId="GEOUNIT">
		<FillLayer
			paint={{
				'fill-color': orange,
				'fill-opacity': hoverStateFilter(0.1, 0.3)
			}}
			manageHoverState
		/>
	</GeoJSON>

	<GeoJSON
		id="assets"
		data={data.assets}
		promoteId="id"
		cluster={{
			radius: 200
		}}
	>
		<MarkerLayer applyToClusters asButton let:feature>
			<div class="marker cluster-marker">
				<p>{feature.properties?.point_count}</p>
			</div>
			<Popup
				on:open={onPopupOpen}
				on:close={onPopupClose}
				openOn="click"
				maxWidth="min(500px, 80vw)"
				closeButton
				><ClusterPopup {feature} {lang} on:openPopupAsset={() => refinePopupPosition()} /></Popup
			>
		</MarkerLayer>

		<MarkerLayer applyToClusters={false} asButton let:feature>
			<div class="marker asset-marker">
				<img
					src={`${base}/icons/${feature.properties?.asset_type}.png`}
					alt={`${feature.properties?.asset_type} icon`}
				/>
			</div>
			<Popup
				on:open={onPopupOpen}
				on:close={onPopupClose}
				openOn="click"
				maxWidth="min(500px, 80vw)"
				closeOnClickOutside
				closeButton
			>
				<AssetPopup {feature} {lang} />
			</Popup>
		</MarkerLayer>
	</GeoJSON>
</MapLibre>
