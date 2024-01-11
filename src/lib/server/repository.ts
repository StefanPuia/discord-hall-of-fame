import sqlite from 'better-sqlite3';
import type { HofMessage } from '$lib/types';
import { error } from '@sveltejs/kit';

const SERVER_CHANNEL_CONFIG: Record<string, string> = {
	'505030650651475991': '684134210306572309',
	'692374848378241065': '1194412606090391643'
};
export const db = sqlite('main.db');

export const getGuildChannel = (guildId: string) => {
	const channel = SERVER_CHANNEL_CONFIG[guildId];
	if (!channel) {
		throw error(501, 'server not configured');
	}
	return channel;
};

export const getMessage = async (databaseId: string): Promise<HofMessage> => {
	return (await getMessages('')).find((m) => m.databaseId === databaseId)!;
};

export const getMessages = async (channelId: string): Promise<HofMessage[]> => {
	if (!channelId) throw new Error();
	return [];
};
