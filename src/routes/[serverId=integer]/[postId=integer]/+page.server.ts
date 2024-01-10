import { getGuildChannel } from '$lib/server/repository';
import type { Actions, PageServerLoad } from './$types';
import { correlate } from '$lib/server/messages';
import { deleteMessage, updateMessage } from '$lib/server/discord-bot';
import dayjs from 'dayjs';
import { redirect } from '@sveltejs/kit';
import { requireAuth } from '$lib/server/lucia';

export const load: PageServerLoad = async ({ params: { serverId, postId }, locals }) => {
	await requireAuth(locals.auth);
	const guildChannel = getGuildChannel(serverId);
	return {
		message: correlate(guildChannel, postId)
	};
};

export const actions: Actions = {
	save: async ({ params: { postId, serverId }, locals, request }) => {
		await requireAuth(locals.auth);

		const formData = await request.formData();
		const existing = await correlate(getGuildChannel(serverId), postId);
		const image = formData.get('image') as File;
		const imageBuffer = image.size ? await image.arrayBuffer() as Buffer : undefined;

		await updateMessage(getGuildChannel(serverId), postId, {
			title: formData.get('title') as string || existing.title,
			date: dayjs(formData.get('date') as string).toDate() || existing.date,
			imageURL: existing.imageURL,
			discordMessageId: postId,
			databaseId: postId
		}, imageBuffer);

		return redirect(302, `/${serverId}`);
	},
	delete: async ({ params: { postId, serverId }, locals }) => {
		await requireAuth(locals.auth);
		await deleteMessage(getGuildChannel(serverId), postId);
		return redirect(302, `/${serverId}`);
	}
};