import { getGuildChannel } from '$lib/server/repository';
import type { Actions } from './$types';
import { postMessage } from '$lib/server/discord-bot';
import dayjs from 'dayjs';
import { error, redirect } from '@sveltejs/kit';
import { requireAuth } from '$lib/server/lucia';
import { backupMessage } from '$lib/server/backup';

export const actions: Actions = {
	create: async ({ params: { serverId }, locals, request }) => {
		await requireAuth(locals.auth);

		const formData = await request.formData();
		const image = formData.get('image') as File;
		const imageBuffer = image.size ? ((await image.arrayBuffer()) as Buffer) : undefined;

		if (!imageBuffer) {
			throw error(400);
		}

		const channelId = await getGuildChannel(serverId);
		const message = await postMessage(
			channelId,
			{
				title: formData.get('title') as string,
				date: dayjs(formData.get('date') as string).toDate(),
				imageURL: '',
				discordId: ''
			},
			imageBuffer
		);

		backupMessage(channelId, message, imageBuffer).catch(console.error);

		return redirect(302, `/${serverId}/${message.discordId}`);
	}
};
