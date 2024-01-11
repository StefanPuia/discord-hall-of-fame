import {
	getMessage as getDiscordMessage,
	getMessages as getDiscordMessages
} from '$lib/server/discord-bot';
import { getMessage as getDbMessage, getMessages as getDbMessages } from '$lib/server/repository';
import type { HofMessage } from '$lib/types';
import { error } from '@sveltejs/kit';

export const correlate = async (guildChannel: string, messageId: string): Promise<HofMessage> => {
	const [discordMessage, dbMessage] = await Promise.allSettled([
		getDiscordMessage(guildChannel, messageId),
		getDbMessage(messageId)
	]);

	const discordMessageF = discordMessage.status === 'fulfilled' ? discordMessage.value : undefined;
	const dbMessageF = dbMessage.status === 'fulfilled' ? dbMessage.value : undefined;

	if (!discordMessageF && !dbMessageF) {
		throw error(500);
	}

	return {
		...dbMessageF!,
		...discordMessageF
	};
};

export const correlateLists = async (guildChannel: string): Promise<HofMessage[]> => {
	const [discordMessages, dbMessages] = await Promise.all([
		getDiscordMessages(guildChannel),
		getDbMessages(guildChannel)
	]);

	const data: HofMessage[] = [...dbMessages];

	for (const message of discordMessages) {
		const existing = data.find((m) => m.discordMessageId === message.discordMessageId);
		if (!existing) {
			data.push(message);
		}
	}

	return data;
};

// const isSync = (dbMessage: HofMessage, discordMessage?: HofMessage) => {
// 	return JSON.stringify(dbMessage) === JSON.stringify(discordMessage);
// };
