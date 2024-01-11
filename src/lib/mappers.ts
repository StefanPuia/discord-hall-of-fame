import type { DiscordGuild } from '$lib/types';

export const discordGuildMapper = <T extends DiscordGuild>({
	id,
	name,
	icon,
	permissions
}: T): DiscordGuild => ({
	id,
	name,
	icon,
	permissions
});
