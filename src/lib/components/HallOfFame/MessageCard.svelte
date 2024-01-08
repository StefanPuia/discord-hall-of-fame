<script lang="ts">
	import { Card, Group, Image, Text } from '@svelteuidev/core';

	export let message: HofMessage;
	export let height = 160;
</script>

<Card shadow='sm' padding='lg'>
	<Card.Section padding='lg'>
		<Image
			src='{message.image}'
			height={height}
			alt='{message.title}'
		/>
	</Card.Section>

	<Text weight={500} pt="m" pb="m">{message.title}</Text>

	<Group position='apart'>
		<Text size='xs'>
			{message.date}
		</Text>
		<slot name="badge" />
	</Group>
</Card>