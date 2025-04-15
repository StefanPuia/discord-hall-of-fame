<script lang="ts">
	import ServerList from '$lib/components/Servers/ServerList.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<ServerList guilds={data.guilds} />
