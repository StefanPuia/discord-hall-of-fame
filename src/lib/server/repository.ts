import { error } from '@sveltejs/kit';
import { getPostByDiscordId, getPostsByChannel, getServer, type Post } from '$lib/server/database';

export const getGuildChannel = async (guildId: string) => {
	const channel = await getServer(guildId);
	if (!channel.data) {
		throw error(404, 'server not configured');
	}
	return channel.data[0].hofChannelId;
};

export const getMessage = async (discordId: string): Promise<Post> => {
	const post = await getPostByDiscordId(discordId);
	return post.data?.[0];
};

export const getMessages = async (channelId: string): Promise<Post[]> => {
	if (!channelId) throw new Error();
	const posts = await getPostsByChannel(channelId);
	return posts.data;
};
