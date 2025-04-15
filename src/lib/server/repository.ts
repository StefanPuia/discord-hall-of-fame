import { error } from '@sveltejs/kit';
import { getPostByDiscordId, getPostsByChannel, getServer, type PostDoc } from '$lib/server/database';

export const getGuildChannel = async (guildId: string) => {
	const channel = await getServer(guildId);
	if (!channel) {
		throw error(404, 'server not configured');
	}
	return channel.hofChannelId;
};

export const getMessage = async (discordId: string): Promise<PostDoc | null> => {
	return getPostByDiscordId(discordId);
};

export const getMessages = async (channelId: string): Promise<PostDoc[]> => {
	if (!channelId) throw new Error();
	return getPostsByChannel(channelId).toArray();
};
