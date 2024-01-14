import type { HofMessage } from '$lib/types';
import { uploadHofImage } from '$lib/server/blob-service';
import { createPost } from '$lib/server/database';

export const backupMessage = async (
	channelId: string,
	message: HofMessage,
	imageBuffer: Buffer
) => {
	const blobName = await uploadHofImage(channelId, message.discordId, imageBuffer);
	await createPost({
		discordId: message.discordId,
		title: message.title,
		date: message.date.toISOString(),
		channel: channelId,
		file: blobName
	});
};
