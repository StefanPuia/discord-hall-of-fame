import { getGuildChannel } from '$lib/server/repository';
import type { Actions, PageServerLoad } from './$types';
import { correlate } from '$lib/server/messages';
import { deleteMessage, postMessage, updateMessage } from '$lib/server/discord-bot';
import dayjs from 'dayjs';
import { redirect } from '@sveltejs/kit';
// import { requireAuth } from '$lib/server/lucia';
import { backupMessage } from '$lib/server/backup';
import { createPost, deletePost } from '$lib/server/database';

export const load: PageServerLoad = async ({ params: { serverId, postId }, locals }) => {
	// await requireAuth(locals.auth);
	const guildChannel = await getGuildChannel(serverId);
	return {
		message: correlate(guildChannel, postId)
	};
};

export const actions: Actions = {
	save: async ({ params: { postId, serverId }, locals, request }) => {
		// await requireAuth(locals.auth);

		const formData = await request.formData();
		const existing = await correlate(await getGuildChannel(serverId), postId);
		const image = formData.get('image') as File;
		const imageBuffer = image.size ? await image.arrayBuffer() : undefined;

		await updateMessage(
			await getGuildChannel(serverId),
			postId,
			{
				title: (formData.get('title') as string) || existing.title,
				date: dayjs(formData.get('date') as string).toDate() || existing.date,
				imageURL: existing.imageURL,
				discordId: postId
			},
			imageBuffer
		);

		return redirect(302, `/${serverId}/${postId}`);
	},

	backup: async ({ params: { postId, serverId } }) => {
		const channelId = await getGuildChannel(serverId);
		const existing = await correlate(await getGuildChannel(serverId), postId);
		const imageBuffer = await (await fetch(existing.imageURL)).arrayBuffer();

		await backupMessage(channelId, existing, imageBuffer);

		return redirect(302, `/${serverId}/${postId}`);
	},

	post: async ({ params: { postId, serverId }, locals }) => {
		// await requireAuth(locals.auth);

		const channelId = await getGuildChannel(serverId);
		const existing = await correlate(await getGuildChannel(serverId), postId);
		const imageBuffer = await (await fetch(existing.imageURL)).arrayBuffer();

		const message = await postMessage(await getGuildChannel(serverId), existing, imageBuffer);

		await deletePost(existing.discordId);
		await createPost({
			discordId: message.discordId,
			title: message.title,
			date: message.date.toISOString(),
			channel: channelId,
			file: existing.blobImage!
		});

		return redirect(302, `/${serverId}/${message.discordId}`);
	},

	delete: async ({ params: { postId, serverId }, locals }) => {
		// await requireAuth(locals.auth);
		await deleteMessage(await getGuildChannel(serverId), postId);
		return redirect(302, `/${serverId}/${postId}`);
	}
};
