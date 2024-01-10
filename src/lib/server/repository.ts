import sqlite from 'better-sqlite3';
import type { HofMessage } from '$lib/types';
import dayjs from 'dayjs';

export const db = sqlite('main.db');

export const getGuildChannel = (guildId: string) => {
	if (guildId === '505030650651475991') {
		return '684134210306572309';
	}
	if (guildId === "692374848378241065") {
		return "1194412606090391643";
	}
	throw new Error('invalid guild');
};

export const getMessage = async (databaseId: string): Promise<HofMessage> => {
	return (await getMessages('')).find(m => m.databaseId === databaseId)!;
};

export const getMessages = async (channelId: string): Promise<HofMessage[]> => {
	return [];
};