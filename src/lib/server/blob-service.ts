import { env } from '$env/dynamic/private';
import { BlobSASPermissions, BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';
import * as crypto from 'crypto';
import { dev } from '$app/environment';

const createContainerClient = () => {
	if (dev) {
		return BlobServiceClient.fromConnectionString('UseDevelopmentStorage=true').getContainerClient(
			'uploads'
		);
	} else {
		const keyCredential = new StorageSharedKeyCredential(
			env.BLOB_STORAGE_ACCOUNT,
			env.BLOB_STORAGE_KEY
		);
		const blobServiceClient = new BlobServiceClient(
			`https://${env.BLOB_STORAGE_ACCOUNT}.blob.core.windows.net`,
			keyCredential
		);
		return blobServiceClient.getContainerClient('uploads');
	}
};

export const uploadHofImage = async (channelId: string, messageId: string, image: ArrayBufferLike) => {
	const containerClient = createContainerClient();
	const blobName = `${channelId}/${messageId}-${crypto.randomUUID()}.jpg`;
	await containerClient.getBlockBlobClient(blobName).uploadData(Buffer.from(image));
	return blobName;
};

export const getSignedURL = async (blobName: string) => {
	const permissions = new BlobSASPermissions();
	permissions.read = true;

	return createContainerClient()
		.getBlockBlobClient(blobName)
		.generateSasUrl({
			permissions,
			expiresOn: new Date(new Date().getTime() + 1000 * 60 * 60)
		});
};
