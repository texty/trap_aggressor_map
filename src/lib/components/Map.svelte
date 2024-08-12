<script lang="ts">
	import { base } from '$app/paths';
	import { tick } from 'svelte';
	import {
		type Map,
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
	import LangSwitcher from './LangSwitcher.svelte';

	export let data: AppDataType;

	let lang: LangType;

	const orange = '#FF5B00';
	let map: Map;
	let loaded = false;
	let currentPopUp: Popup | null = null;

	async function onPopupOpen(e: CustomEvent) {
		currentPopUp?._closeButton.click();
		await tick();
		currentPopUp = e.detail;
	}

	function onPopupClose() {
		currentPopUp = null;
	}

	// $: if (map && loaded) {
	// 	const layerIds = ['boundary_country_inner', ];
	// 	for (const id of layerIds) {
	// 		map.setPaintProperty(id, 'line-color', orange);
	// 		map.setPaintProperty(id, 'line-opacity', 0.3);
	// 		map.setPaintProperty(id, 'line-width', 1);
	// 	}
	// }
</script>

<LangSwitcher bind:lang />

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
				closeButton><ClusterPopup {feature} {lang} /></Popup
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
