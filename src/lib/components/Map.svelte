<script lang="ts">
	import {
		MapLibre,
		GeoJSON,
		FillLayer,
		MarkerLayer,
		hoverStateFilter
	} from 'svelte-maplibre';
	import type { AppDataType } from '$lib/types';

	export let data: AppDataType;

	const orange = '#FF5B00';
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
				'fill-opacity': hoverStateFilter(0.2, 0.4)
			}}
			manageHoverState
		/>
	</GeoJSON>

	<GeoJSON
		id="assets"
		data={data.assets}
		promoteId="id"
		cluster={{
			radius: 200,
			maxZoom: 14
		}}
	>
		<MarkerLayer applyToClusters asButton let:feature>
			<div class="marker cluster-marker">
				<p>{feature.properties?.point_count}</p>
			</div>
		</MarkerLayer>

		<MarkerLayer applyToClusters={false} asButton let:feature>
			<div class="marker asset-marker">
				<img
					src={`icons/${feature.properties?.asset_type}.png`}
					alt={`${feature.properties?.asset_type} icon`}
				/>
			</div>
		</MarkerLayer>
	</GeoJSON>
</MapLibre>
