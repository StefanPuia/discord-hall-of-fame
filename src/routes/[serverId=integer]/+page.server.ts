import { getGuildChannel } from '$lib/server/repository';
import type { PageServerLoad } from './$types';
import { correlateLists } from '$lib/server/messages';

export const load: PageServerLoad = async ({ params: { serverId } }) => {
	const guildChannel = getGuildChannel(serverId);
	return {
		messages: correlateLists(guildChannel)
	};
};