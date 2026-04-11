<script lang="ts">
	import type { PageData } from './$types';
	import SkeletonCard from '$lib/components/HallOfFame/SkeletonCard.svelte';
	import { Button, Input, Label } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import MessageCard from '$lib/components/HallOfFame/MessageCard.svelte';

	export let data: PageData;

	const dateToString = (date: Date) => {
		return date.toISOString().split('T')[0];
	};

	const confirmDelete = ({ cancel }: { cancel: () => void }) => {
		if (!confirm('Are you sure you want to delete this post?')) {
			return cancel();
		}
	};
</script>

{#await data.message}
	<SkeletonCard />
{:then message}
	<div class="flex flex-col items-center w-full">
		<div class="w-full max-w-md">
			<MessageCard {message} />
		</div>

		<div class="pt-12 flex flex-col items-center w-full">
			<form
				action="?/save"
				method="post"
				enctype="multipart/form-data"
				use:enhance
				class="w-full max-w-md"
			>
				<div class="flex flex-col gap-xs">
					<div class="mb-6">
						<Label for="title" class="mb-2 block">Title</Label>
						<Input
							id="title"
							required
							placeholder="Mythic: The Lich King"
							name="title"
							type="text"
							value={message.title}
						/>
					</div>
					<div class="mb-6">
						<Label for="date" class="mb-2 block">Date</Label>
						<Input id="date" required value={dateToString(message.date)} name="date" type="date" />
					</div>
					<div class="mb-6">
						<Label for="image" class="mb-2 block">Change Image</Label>
						<Input id="image" required name="image" type="file" accept="image/*" />
					</div>
					{#if message.exists}
						<Button type="submit" color="green">Save</Button>
					{/if}
				</div>
			</form>

			{#if !message.exists}
				<form action="?/post" method="post" use:enhance class="pt-2 w-full max-w-md">
					<div class="flex flex-col gap-xs">
						<Button type="submit">Push to Discord</Button>
					</div>
				</form>
			{:else}
				<form
					class="pt-2 w-full max-w-md"
					action="?/delete"
					method="post"
					use:enhance={confirmDelete}
				>
					<div class="flex flex-col gap-xs">
						<Button type="submit" color="red">Delete from Discord</Button>
					</div>
				</form>
				{#if !message.blobImage}
					<form action="?/backup" method="post" use:enhance class="pt-2 w-full max-w-md">
						<div class="flex flex-col gap-xs">
							<Button type="submit" color="orange">Backup message</Button>
						</div>
					</form>
				{/if}
			{/if}
		</div>
	</div>
{/await}
