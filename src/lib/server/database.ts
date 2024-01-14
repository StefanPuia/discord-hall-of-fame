import axios from 'axios';
import { isMockEnabled } from '$lib';
import MockAdapter from 'axios-mock-adapter';
import { dev } from '$app/environment';
import fetchAdapter from '@haverstack/axios-fetch-adapter';
import { mockRoutes } from '../../mocks/mock.routes';
import { BASE_URL } from '$env/static/private';

export const service = axios.create({
	baseURL: dev ? 'http://127.0.0.1:4280/data-api/rest' : `${BASE_URL}/data-api/rest`,
	...(dev ? {} : { adapter: fetchAdapter })
});

service.interceptors.response.use((response) => {
	if (response.data?.value) {
		response.data = response.data.value;
	}
	return response;
});

if (isMockEnabled()) {
	const mockAdapter = new MockAdapter(service, { delayResponse: 1000 });
	mockRoutes(mockAdapter);
}

export const getServer = (discordId: string) =>
	service.get<Server[]>(`/server/discordId/${encodeURIComponent(discordId)}`);
export const getPostByDiscordId = (discordId: string) =>
	service.get<Post[]>(`/post/discordId/${encodeURIComponent(discordId)}`);
export const getPostsByChannel = (channelId: string) =>
	service.get<Post[]>(`/post`, {
		params: {
			$filter: `channel eq '${encodeURIComponent(channelId)}' and deleted eq null`
		}
	});
export const createPost = (post: Omit<Post, 'id'>) => service.post(`/post`, post);
export const deletePost = (discordId: string) =>
	service.patch(`/post/discordId/${encodeURIComponent(discordId)}`, {
		deleted: new Date().toISOString()
	});

export type User = {
	id: string;
	discordId: string;
};

export type Server = {
	discordId: string;
	hofChannelId: string;
};

export type Post = {
	discordId: string;
	date: string;
	file: string;
	title: string;
	channel: string;
	deleted?: string;
};
