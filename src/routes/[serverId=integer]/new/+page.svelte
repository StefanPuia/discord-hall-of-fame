<script lang="ts">
	import { Button, Input, InputWrapper, Stack, TextInput } from '@svelteuidev/core';
	import { enhance } from '$app/forms';
	import { formatDate } from '$lib/display';
</script>

<Stack>
	<form action="?/create" method="post" enctype="multipart/form-data" use:enhance>
		<Stack>
			<TextInput placeholder="e.g. Mythic The Lich King" label="Title" name="title" required />

			<TextInput
				placeholder="e.g. 12 June 2000"
				label="Date"
				name="date"
				required
				value={formatDate(new Date())}
			/>

			<InputWrapper label="Image" required>
				<Input type="file" required name="image" />
			</InputWrapper>

			<Button type="submit" color="green">Create</Button>
		</Stack>
	</form>
</Stack>
