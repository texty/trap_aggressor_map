<script lang="ts">
	import type { PageData } from './$types';
	import Map from '$lib/components/Map.svelte';

	import '../scss/map.scss';
	import '../scss/popup.scss';

	export let data: PageData;
</script>

<Map {data} />
