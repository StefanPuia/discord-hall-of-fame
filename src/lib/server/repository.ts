import sqlite from 'better-sqlite3';

export const db = sqlite('main.db');

export const getGuildChannel = (guildId: string) => {
	if (guildId === '505030650651475991') {
		return '684134210306572309';
	}
	throw new Error('invalid guild');
};

export const getMessage = async (messageId: string): Promise<HofMessage> => {
	return (await getMessages('')).find(m => m.id === messageId)!;
};

export const getMessages = async (channelId: string): Promise<HofMessage[]> => {
	return [
	]
		;
};