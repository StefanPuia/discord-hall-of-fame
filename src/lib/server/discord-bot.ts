import { REST, Routes } from 'discord.js';
import { DISCORD_BOT_TOKEN } from '$env/static/private';
import { discordGuildMapper } from '$lib/mappers';

const cache: {
	botGuilds: DiscordGuild[] | null
} = {
	botGuilds: null
};

const rest = new REST({ authPrefix: 'Bot' }).setToken(DISCORD_BOT_TOKEN);

export const getBotGuilds = async () => {
	if (!cache.botGuilds) {
		const guilds = await rest.get(Routes.userGuilds()) as DiscordGuild[];
		cache.botGuilds = guilds.map(discordGuildMapper);
	}
	return cache.botGuilds;
};

export const getMessage = async (channelId: string, messageId: string): Promise<HofMessage> => {
	const message = await rest.get(Routes.channelMessage(channelId, messageId)) as Record<string, any>;
	return mapMessage(message);
};

export const getMessages = async (channelId: string): Promise<HofMessage[]> => {
	const messages = await rest.get(Routes.channelMessages(channelId)) as Record<string, any>[];
	return messages.map(mapMessage);
};

const mapMessage = (message: any) => ({
	id: message.id,
	title: message.embeds[0].title,
	date: message.embeds[0].footer.text,
	image: message.embeds[0].image.url
});