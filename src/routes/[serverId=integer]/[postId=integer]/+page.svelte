<script lang="ts">
	import MessageCard from '$lib/components/HallOfFame/MessageCard.svelte';
	import type { PageData } from './$types';
	import SkeletonCard from '$lib/components/HallOfFame/SkeletonCard.svelte';
	import { Button } from '@svelteuidev/core';

	export let data: PageData;
</script>


{#await data.message}
	<SkeletonCard />
{:then message}
	<MessageCard height={400} message={message.db} />

	{#if !message.discord}
		<Button>Push to Discord</Button>
	{/if}
{/await}
