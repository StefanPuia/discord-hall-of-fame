import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { isUserOwner } from '$lib/server/discord-bot';
import { Server } from '$lib/server/database';
import { generateIdFromEntropySize } from 'lucia';

export async function POST(event: RequestEvent) {
	if (!isUserOwner(event.locals.user)) {
		return error(401);
	}

	const data = await event.request.formData();
	const serverId = data.get('serverId');
	const channelId = data.get('channelId');

	if (serverId && channelId) {
		if (!event.locals.session?.guilds.find((g) => g.id === serverId)) {
			return error(403, 'Cannot configure server with that id');
		}
		await Server.insertOne({
			_id: generateIdFromEntropySize(10),
			discordId: serverId as string,
			hofChannelId: channelId as string
		});
		return redirect(302, `/${serverId}`);
	}

	return error(500, 'Could not configure server');
}
