import axios from 'axios';
import oauth from 'axios-oauth-client';
import { isMockEnabled } from '$lib';
import MockAdapter from 'axios-mock-adapter';
import { dev } from '$app/environment';
import { mockRoutes } from '../../mocks/mock.routes';
import { AZURE_AD_CLIENT_ID, AZURE_AD_CLIENT_SECRET, AZURE_AD_TENANT_ID, DAB_BASE_URL } from '$env/static/private';

type AuthType = {
	token_type: string;
	expires_in: number;
	access_token: string;
	expires?: number;
};

let auth: AuthType | undefined = undefined;

const authenticate = async () => {
	const getOwnerCredentials = oauth.clientCredentials(
		axios.create(),
		`https://login.microsoftonline.com/${AZURE_AD_TENANT_ID}/oauth2/v2.0/token`,
		AZURE_AD_CLIENT_ID,
		AZURE_AD_CLIENT_SECRET
	);
	auth = (await getOwnerCredentials(`${AZURE_AD_CLIENT_ID}/.default`)) as AuthType;
	auth.expires = new Date().getTime() + auth.expires_in * 1000;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAuthToken = async () => {
	try {
		if (!auth) {
			await authenticate();
		} else {
			const now = new Date().getTime();
			if (now > (auth?.expires ?? 0) - 2000) {
				auth = undefined;
				await getAuthToken();
			}
		}
	} catch (e) {
		console.error('failed to get auth token');
	}
};
export const service = axios.create({
	baseURL: dev ? 'http://127.0.0.1:4280/data-api/rest' : `${DAB_BASE_URL}/data-api/rest`
});

service.interceptors.request.use(async (request) => {
	// await getAuthToken();
	// if (auth) {
	// 	request.headers = request.headers ?? new Headers();
	// 	request.headers?.set('Authorization', `${auth?.token_type} ${auth?.access_token}`);
	// }
	return request;
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
