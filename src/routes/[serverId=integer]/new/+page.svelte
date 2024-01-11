<script lang="ts">
	import { Button, Input, InputWrapper, Stack, TextInput } from '@svelteuidev/core';
	import { enhance } from '$app/forms';
	import { formatDate } from '$lib/display';

	const today = formatDate(new Date());
</script>

<Stack>
	<form action="?/create" method="post" enctype="multipart/form-data" use:enhance>
		<Stack>
			<TextInput placeholder="Mythic: The Lich King" label="Title" name="title" required />

			<TextInput placeholder={today} label="Date" name="date" required value={today} />

			<InputWrapper label="Image" required>
				<Input type="file" required name="image" />
			</InputWrapper>

			<Button type="submit" color="green">Create</Button>
		</Stack>
	</form>
</Stack>
