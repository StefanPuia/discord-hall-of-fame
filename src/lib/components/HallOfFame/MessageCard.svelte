<script lang="ts">
	import type { HofMessage } from '$lib/types';
	import { formatDate } from '$lib/display';
	import Card from '$lib/components/Card.svelte';
	import { Badge } from 'flowbite-svelte';

	export let message: HofMessage;
</script>

<Card title={message.title} img={message.imageURL}>
	{#snippet subtitle()}
		{formatDate(message.date)}

		<div>
			{#if !message.exists}
				<Badge color="yellow" large>Message missing</Badge>
			{/if}
			{#if !message.blobImage}
				<Badge color="red" large>Backup Missing</Badge>
			{/if}
		</div>
	{/snippet}
</Card>
