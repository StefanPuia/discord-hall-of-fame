<script lang="ts">
	import type { PageData } from './$types';
	import SkeletonCard from '$lib/components/HallOfFame/SkeletonCard.svelte';
	import { Button, Flex, Input, InputWrapper, Stack, TextInput } from '@svelteuidev/core';
	import { enhance } from '$app/forms';
	import MessageCard from '$lib/components/HallOfFame/MessageCard.svelte';
	import { formatDate } from '$lib/display';

	export let data: PageData;
</script>

{#await data.message}
	<SkeletonCard />
{:then message}
	<Stack>
		<MessageCard height={400} {message} />

		<form action="?/save" method="post" enctype="multipart/form-data" use:enhance>
			<Stack>
				<TextInput
					placeholder="e.g. Mythic The Lich King"
					label="Title"
					name="title"
					value={message.title}
				/>

				<TextInput
					placeholder="e.g. 12 June 2000"
					label="Date"
					name="date"
					value={formatDate(message.date)}
				/>

				<InputWrapper label="Image">
					<Input type="file" name="image" />
				</InputWrapper>

				<Flex gap="md">
					<Button type="submit" color="green">Save</Button>
					{#if !message.discordMessageId}
						<form action="?/post" method="post" use:enhance>
							<Button type="submit">Push to Discord</Button>
						</form>
					{:else}
						<form action="?/delete" method="post" use:enhance>
							<Button type="submit" color="red">Delete</Button>
						</form>
					{/if}
				</Flex>
			</Stack>
		</form>
	</Stack>
{/await}
