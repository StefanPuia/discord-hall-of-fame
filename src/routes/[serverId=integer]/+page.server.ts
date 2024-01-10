import { getGuildChannel } from '$lib/server/repository';
import type { PageServerLoad } from './$types';
import { correlateLists } from '$lib/server/messages';
import { requireAuth } from '$lib/server/lucia';

export const load: PageServerLoad = async ({ params: { serverId }, locals }) => {
	await requireAuth(locals.auth);
	const guildChannel = getGuildChannel(serverId);
	return {
		messages: correlateLists(guildChannel)
	};
};