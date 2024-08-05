<script lang="ts">
	import { base } from '$app/paths';
	import {
		MapLibre,
		GeoJSON,
		FillLayer,
		MarkerLayer,
		Popup,
		hoverStateFilter
	} from 'svelte-maplibre';
	import type { AppDataType } from '$lib';
	import AssetPopup from './AssetPopup.svelte';
	import ClusterPopup from './ClusterPopup.svelte';
	export let data: AppDataType;

	const orange = '#FF5B00';

	let currentPopUp: Popup | null = null;

	function onPopupOpen(e: CustomEvent) {
		if (currentPopUp) {
			currentPopUp._closeButton.click();
		}
		currentPopUp = e.detail;
	}
</script>

<MapLibre
	class="assets-map"
	style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
	standardControls
	center={[7, 47]}
	zoom={4}
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
			<Popup on:open={onPopupOpen} openOn="click" closeOnClickOutside closeButton
				><ClusterPopup {feature} /></Popup
			>
		</MarkerLayer>

		<MarkerLayer applyToClusters={false} asButton let:feature>
			<div class="marker asset-marker">
				<img
					src={`${base}/icons/${feature.properties?.asset_type}.png`}
					alt={`${feature.properties?.asset_type} icon`}
				/>
			</div>
			<Popup on:open={onPopupOpen} openOn="click" closeOnClickOutside closeButton>
				<AssetPopup {feature} />
			</Popup>
		</MarkerLayer>
	</GeoJSON>
</MapLibre>
