export const discordGuildMapper = <T extends DiscordGuild>({ id, name, icon }: T): DiscordGuild => ({ id, name, icon });