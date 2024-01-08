<script lang="ts">
	import type { LayoutData } from './$types';
	import { SvelteUIProvider } from '@svelteuidev/core';
	import App from '$lib/components/App/App.svelte';
	import { userStore } from '$lib/stores.js';

	export let data: LayoutData;

	$userStore = data.user || null;
</script>

<svelte:head>
	<title>Hall of Fame</title>
</svelte:head>

<SvelteUIProvider themeObserver="dark" withNormalizeCSS withGlobalStyles>
	<App>
		<slot />
	</App>
</SvelteUIProvider>

<style>
	:global(a) {
			text-decoration: none!important;
	}
</style>