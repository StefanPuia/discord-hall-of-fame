import { getMessage as getDiscordMessage, getMessages as getDiscordMessages } from '$lib/server/discord-bot';
import { getMessage as getDbMessage, getMessages as getDbMessages } from '$lib/server/repository';
import { error } from '@sveltejs/kit';

export const correlate = async (guildChannel: string, messageId: string): Promise<HofMessagePair> => {
	const [discordMessage, dbMessage] = await Promise.allSettled([getDiscordMessage(guildChannel, messageId), getDbMessage(messageId)]);

	if (dbMessage.status === 'rejected') {
		throw error(500);
	}

	return {
		db: dbMessage.value, discord: discordMessage.status === 'fulfilled' ? discordMessage.value : undefined
		// sync: isSync(dbMessage, discordMessage)
	};
};

export const correlateLists = async (guildChannel: string): Promise<HofMessagePair[]> => {
	const [discordMessages, dbMessages] = await Promise.all([getDiscordMessages(guildChannel), getDbMessages(guildChannel)]);

	const data: Record<string, HofMessagePair> = {};

	for (const message of dbMessages) {
		data[message.id] = {
			db: message
			// sync: false
		};
	}

	for (const message of discordMessages) {
		data[message.id].discord = message;
		// data[message.id].sync = isSync(data[message.id].db, message);
	}

	return Object.values(data);
};

// const isSync = (dbMessage: HofMessage, discordMessage?: HofMessage) => {
// 	return JSON.stringify(dbMessage) === JSON.stringify(discordMessage);
// };