<script lang="ts">
	import { Button, Input, Label } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { formatDate } from '$lib/display';

	const today = formatDate(new Date());
</script>

<div class="pt-12 flex flex-col items-center">
	<form
		action="?/create"
		method="post"
		enctype="multipart/form-data"
		use:enhance
		class="w-full max-w-md"
	>
		<div class="flex flex-col gap-xs">
			<div class="mb-6">
				<Label for="title" class="mb-2 block">Title</Label>
				<Input id="title" required placeholder="Mythic: The Lich King" name="title" type="text" />
			</div>
			<div class="mb-6">
				<Label for="date" class="mb-2 block">Date</Label>
				<Input id="date" required value={today} name="date" type="date" />
			</div>
			<div class="mb-6">
				<Label for="image" class="mb-2 block">Image</Label>
				<Input id="image" required name="image" type="file" accept="image/*" />
			</div>
			<Button type="submit" color="green">Create</Button>
		</div>
	</form>
</div>
