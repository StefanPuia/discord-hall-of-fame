import MockAdapter from 'axios-mock-adapter';
import type { Server, User } from '$lib/server/database';

export const mockRoutes = (ma: MockAdapter) => {
	const userMatcher = new RegExp('^/user/(?<userId>[^/]+)$');
	ma.onGet(userMatcher).reply<User>(async (config) => {
		const userId = config.url?.match(userMatcher)?.groups?.['userId'];
		return [
			200,
			{
				id: '6377e715-8c1a-4730-9b1e-bfa1f7766de0',
				discordId: userId
			} as User
		];
	});

	const serverMatcher = new RegExp('^/server/(?<userId>[^/]+)$');
	ma.onGet(userMatcher).reply<User>(async (config) => {
		const serverId = config.url?.match(serverMatcher)?.groups?.['serverId'] as string;
		return [
			200,
			{
				discordId: serverId,
				hofChannelId: ''
			} as Server
		];
	});
};
