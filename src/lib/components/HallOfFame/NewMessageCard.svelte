<script lang="ts">
	import { Card, Image, Text } from '@svelteuidev/core';

	export let height = 160;
</script>

<Card shadow="sm" padding="lg">
	<Card.Section padding="lg">
		<Image {height} alt="New post image placeholder" usePlaceholder />
	</Card.Section>

	<Text weight={500} pt="m" pb="m">New Post</Text>

	<Text size="xs" mb="m">Click to create</Text>
</Card>
