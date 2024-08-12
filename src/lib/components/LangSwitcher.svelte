<script lang="ts">
	import type { LangType } from '$lib';
	import '../../scss/lang_switcher.scss';

	export let lang: LangType = 'uk';

	const langs: LangType[] = ['uk', 'en'];
</script>

<nav id="lang-switcher">
	{#each langs as l}
		<button class:active={lang === l} on:click={() => (lang = l)}>
			{l}
		</button>
	{/each}
</nav>
