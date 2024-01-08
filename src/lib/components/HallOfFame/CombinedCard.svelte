<script lang="ts">
	import { Badge } from '@svelteuidev/core';
	import MessageCard from '$lib/components/HallOfFame/MessageCard.svelte';

	export let message: HofMessagePair;
</script>

<MessageCard message={message.db}>
	<svelte:fragment slot="badge">
		{#if !message.discord}
			<Badge color='red' variant='filled'>
				Message missing
			</Badge>
		{/if}
	</svelte:fragment>
</MessageCard>