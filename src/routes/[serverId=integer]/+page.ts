export const load = async ({ params, data }) => {
	return {
		serverId: params.serverId,
		messages: data.messages
	};
};