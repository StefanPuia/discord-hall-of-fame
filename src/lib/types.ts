export type DiscordGuild = {
	id: string;
	name: string;
	icon: string;
}

export type HofMessage = {
	databaseId: string;
	discordMessageId?: string;
	title: string;
	date: Date;
	blobImage?: string;
	imageURL: string;
}