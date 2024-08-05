<script lang="ts">
	import type { Feature } from 'geojson';
	import type { Point } from 'GeoJSON';
	import { mapContext } from 'svelte-maplibre';
	import type { MapContext } from 'svelte-maplibre/context.svelte';
	import { type PointDataType, asset_type_dict } from '$lib';
	import '../../scss/cluster_popup.scss';
	import AssetPopup from './AssetPopup.svelte';

	export let feature: Feature;

	interface PointFeature extends Feature {
		properties: PointDataType;
		geometry: Point;
	}

	const { map, source } = mapContext() as MapContext;

	let innerFeatures: PointFeature[] = [];

	let openAssetData: PointFeature | null = null;

	$: if ($map && $source && feature) {
		$map
			?.getSource($source)
			?.getClusterLeaves(feature?.properties?.cluster_id, 10000, 0)
			.then((features: Feature[]) => {
				innerFeatures = features as PointFeature[];
			});
	}

	function openAsset(feature: PointFeature) {
		// if (!$map) return;
		// $map.easeTo({
		//   zoom: Math.max($map.getZoom(), 11),
		//   center: feature.geometry.coordinates as [number, number],
		// })
		openAssetData = feature.properties.id === openAssetData?.properties.id ? null : feature;
	}
</script>

<div class="popup cluster-popup">
	<table>
		<thead>
			<tr>
				<th>Тип активу</th>
				<th>Власник(и)</th>
				<th>Адреса</th>
			</tr></thead
		>
		<tbody>
			{#each innerFeatures as feat (feat.properties.id)}
				{@const isActive = openAssetData?.properties.id === feat.properties.id}
				<tr on:click={() => openAsset(feat)} class:active={isActive}>
					<td>{asset_type_dict[feat.properties.asset_type]}</td>
					<td>{feat.properties.associated_person}</td>
					<td>
						{#if feat.properties.asset_name}
							{feat.properties.asset_name}<br />
						{/if}
						{feat.properties.registered_address}</td
					>
				</tr>
				{#if isActive}
					<tr class="details">
						<td colspan="3">
							<AssetPopup feature={openAssetData} />
						</td>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
</div>
