<script lang="ts">
	import { base } from '$app/paths';
	import type { PageData } from './$types';

	import type { LangType } from '$lib';
	import LangSwitcher from '$lib/components/LangSwitcher.svelte';
	import Map from '$lib/components/Map.svelte';
	import Text from '$lib/components/Text.svelte';

	import '../scss/map.scss';
	import '../scss/popup.scss';

	export let data: PageData;

	let lang: LangType;
</script>

<LangSwitcher bind:lang />
<Text {lang} />

<div id="map-container">
	<Map {data} {lang} />
	<img src={`${base}/icons/logo.png`} alt="Логотип Trap Aggressor" class="logo" />
</div>
