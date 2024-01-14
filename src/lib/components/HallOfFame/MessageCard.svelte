<script lang="ts">
	import { Badge, Card, Image, Text } from '@svelteuidev/core';
	import type { HofMessage } from '$lib/types';
	import { formatDate } from '$lib/display';

	export let message: HofMessage;
	export let height = 160;
</script>

<Card shadow="sm" padding="lg">
	<Card.Section padding="lg">
		<Image src={message.imageURL} {height} alt={message.title} />
	</Card.Section>

	<Text weight={500} pt="m" pb="m">{message.title}</Text>

	<Text size="xs" mb="m">
		{formatDate(message.date)}
	</Text>

	{#if !message.exists}
		<Badge color="orange" variant="filled">Message missing</Badge>
	{/if}
	{#if !message.blobImage}
		<Badge color="red" variant="filled">Backup Missing</Badge>
	{/if}
</Card>
