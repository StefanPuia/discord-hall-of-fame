import { getMessage as getDiscordMessage, getMessages as getDiscordMessages } from '$lib/server/discord-bot';
import { getMessage as getDbMessage, getMessages as getDbMessages } from '$lib/server/repository';
import type { HofMessage } from '$lib/types';
import { error } from '@sveltejs/kit';
import { getSignedURL } from '$lib/server/blob-service';

export const correlate = async (guildChannel: string, messageId: string): Promise<HofMessage> => {
	const [discordResult, dbResult] = await Promise.allSettled([
		getDiscordMessage(guildChannel, messageId),
		getDbMessage(messageId)
	]);

	const discordMessage = discordResult.status === 'fulfilled' ? discordResult.value : undefined;
	const dbMessage = dbResult.status === 'fulfilled' ? dbResult.value : undefined;

	// At least one has to exist
	if (!discordMessage && !dbMessage) {
		throw error(500);
	}

	const imageURL = discordMessage?.imageURL ?? (await getSignedURL(dbMessage!.file));

	return {
		discordId: (discordMessage?.discordId ?? dbMessage?.discordId)!,
		title: (discordMessage?.title ?? dbMessage?.title)!,
		date: new Date((discordMessage?.date ?? dbMessage?.date)!),
		imageURL,
		exists: !!discordMessage,
		blobImage: dbMessage?.file
	};
};

export const correlateLists = async (guildChannel: string): Promise<HofMessage[]> => {
	const [discordMessages, dbMessages] = await Promise.all([
		getDiscordMessages(guildChannel),
		getDbMessages(guildChannel)
	]);

	const data: HofMessage[] = [...discordMessages];

	for (const dbMessage of dbMessages) {
		const discordExisting = data.find((m) => m.discordId === dbMessage.discordId);
		if (!discordExisting) {
			data.push({
				discordId: dbMessage.discordId,
				title: dbMessage.title,
				date: new Date(dbMessage.date),
				imageURL: await getSignedURL(dbMessage!.file),
				blobImage: dbMessage.file,
				exists: false
			});
		} else {
			discordExisting.blobImage = dbMessage.file;
		}
	}

	return data;
};
