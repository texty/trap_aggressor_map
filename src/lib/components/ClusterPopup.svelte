<script lang="ts">
	import type { Feature } from 'geojson';
	import type { Point } from 'GeoJSON';
	import type { GeoJSONSource } from 'maplibre-gl';
	import { createEventDispatcher, tick } from 'svelte';
	import type { MapContext } from 'svelte-maplibre/context.svelte';
	import { mapContext } from 'svelte-maplibre';

	import { type LangType, type PointDataType, asset_type_dict } from '$lib';
	import AssetPopup from './AssetPopup.svelte';
	import '../../scss/cluster_popup.scss';

	export let feature: Feature;
	export let lang: LangType;

	interface PointFeature extends Feature {
		properties: PointDataType;
		geometry: Point;
	}

	const { map, source } = mapContext() as MapContext;
	const dispatch = createEventDispatcher();

	let innerFeatures: PointFeature[] = [];

	let openAssetData: PointFeature | null = null;

	$: if ($map && $source && feature) {
		($map?.getSource($source) as GeoJSONSource | null)
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
		if (feature.properties.id === openAssetData?.properties.id) {
			openAssetData = null;
		} else {
			openAssetData = feature;
			tick().then(() => dispatch('openPopupAsset'));
		}
	}
</script>

<div class="popup cluster-popup">
	<table>
		<thead>
			<tr>
				{#if lang === 'uk'}
					<th>Тип активу</th>
					<th>Власник(и)</th>
					<th>Адреса</th>
				{:else}
					<th>Asset type</th>
					<th>Owner(s)</th>
					<th>Address</th>
				{/if}
			</tr></thead
		>
		<tbody>
			{#each innerFeatures as feat (feat.properties.id)}
				{@const isActive = openAssetData?.properties.id === feat.properties.id}
				<tr on:click={() => openAsset(feat)} class:active={isActive}>
					<td>{asset_type_dict[feat.properties.asset_type][lang]}</td>
					<td
						>{lang === 'uk'
							? feat.properties.associated_person
							: feat.properties.associated_person_en}</td
					>
					<td>
						{#if feat.properties.asset_name}
							{feat.properties.asset_name}<br />
						{/if}
						{feat.properties.registered_address}</td
					>
				</tr>
				{#if isActive && openAssetData}
					<tr class="details">
						<td colspan="3">
							<AssetPopup feature={openAssetData} {lang} />
						</td>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
</div>
