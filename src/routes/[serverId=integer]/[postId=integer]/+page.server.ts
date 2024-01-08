import { getGuildChannel } from '$lib/server/repository';
import type { PageServerLoad } from './$types';
import { correlate } from '$lib/server/messages';

export const load: PageServerLoad = async ({ params: { serverId, postId } }) => {
	const guildChannel = getGuildChannel(serverId);
	return {
		message: correlate(guildChannel, postId)
	};
};