import { Attachment, Message, REST, Routes } from 'discord.js';
import { env } from '$env/dynamic/private';
import { discordGuildMapper } from '$lib/mappers';
import dayjs from 'dayjs';
import type { DiscordGuild, HofMessage } from '$lib/types';
import { formatDate } from '$lib/display';

const cache: {
	botGuilds: DiscordGuild[] | null;
} = {
	botGuilds: null
};

const rest = new REST({ authPrefix: 'Bot' }).setToken(env.DISCORD_BOT_TOKEN);

export const getBotGuilds = async () => {
	if (!cache.botGuilds) {
		const guilds = (await rest.get(Routes.userGuilds())) as DiscordGuild[];
		cache.botGuilds = guilds.map(discordGuildMapper);
	}
	return cache.botGuilds;
};

export const getMessage = async (channelId: string, messageId: string): Promise<HofMessage> => {
	const message = (await rest.get(Routes.channelMessage(channelId, messageId))) as Message;
	return mapMessage(message);
};

export const getMessages = async (channelId: string): Promise<HofMessage[]> => {
	const messages = (await rest.get(Routes.channelMessages(channelId))) as Message[];
	return messages.filter((m) => m.author.id === env.DISCORD_BOT_ID).map(mapMessage);
};

export const postMessage = async (
	channelId: string,
	message: HofMessage,
	image: ArrayBufferLike
): Promise<HofMessage> => {
	const discordMessage = (await rest.post(Routes.channelMessages(channelId), {
		files: [
			{
				data: Buffer.from(image),
				name: 'image.jpg'
			}
		],
		body: {
			content: `**${message.title}**\n*${formatDate(message.date)}*`
		}
	})) as Message;
	return {
		...message,
		exists: true,
		discordId: discordMessage.id
	};
};

export const updateMessage = async (
	channelId: string,
	messageId: string,
	message: HofMessage,
	imageBuffer?: ArrayBufferLike
) => {
	let image = imageBuffer;
	if (!image) {
		image = await (await fetch(message.imageURL)).arrayBuffer();
	}
	await rest.patch(Routes.channelMessage(channelId, messageId), {
		files: [
			{
				data: Buffer.from(image),
				name: 'image.jpg'
			}
		],
		body: {
			content: `**${message.title}**\n*${formatDate(message.date)}*`,
			embeds: []
		}
	});
};

export const deleteMessage = async (channelId: string, messageId: string) => {
	await rest.delete(Routes.channelMessage(channelId, messageId));
};

const mapMessage = (message: Message): HofMessage => {
	const { title, date } =
	message?.content.match(/\*\*(?<title>.+?)\*\*\n\*(?<date>.+?)\*/)?.groups ?? {};
	return {
		discordId: message.id,
		title,
		date: dayjs(date).toDate(),
		imageURL: (message.attachments as unknown as Attachment[])[0].url,
		exists: true
	};
};

export const isUserOwner = (user?: App.Locals['user']) => {
	return (env.DISCORD_OWNERS || '').split(',').includes(user?.discordId || '-1');
};
