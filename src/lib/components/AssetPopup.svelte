<script lang="ts">
	import { base } from '$app/paths';
	import type { Feature } from 'geojson';
	import { type PointDataType, asset_type_dict } from '$lib';
	import '../../scss/asset_popup.scss';

	export let feature: Feature;
	const data = feature.properties as PointDataType;
</script>

<div class="popup asset-popup">
	{#if data.photo}
		<img
			src={`${base}/photo/${data.photo}`}
			alt="Фото {data.asset_name || data.registered_address}"
			class="asset-photo"
		/>
	{/if}
	<div class="flag-and-type">
		<img
			src={`${base}/flags/${data.jurisdiction}.jpg`}
			alt="Прапор {data.jurisdiction}"
			class="flag"
		/>
		<p class="asset_type">{asset_type_dict[data.asset_type]}</p>
	</div>
	<h4>
		{#if data.asset_name}
			{data.asset_name}<br />
		{/if}
		<span class="address">{data.registered_address}</span>
	</h4>
	<p class="owner">
		Власник{#if data.associated_person.includes(',')}и{/if}: {data.associated_person}
	</p>
	<p class="description">
		{data.relevance}
	</p>
	{#if data.link}
		<p>Розслідування: <a href={data.link} target="_blank">{data.link_text}</a></p>
	{/if}
</div>
