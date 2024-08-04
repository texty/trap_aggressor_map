<script lang="ts">
	import type { PageData } from './$types';
	import '../scss/map.scss';
	import Map from '$lib/components/Map.svelte';

	export let data: PageData;
</script>

<Map {data} />
