import { BLOB_STORAGE_ACCOUNT, BLOB_STORAGE_KEY } from '$env/static/private';
import {
	BlobSASPermissions,
	BlobServiceClient,
	StorageSharedKeyCredential
} from '@azure/storage-blob';
import * as crypto from 'crypto';

const createContainerClient = () => {
	const sharedKeyCredential = new StorageSharedKeyCredential(
		BLOB_STORAGE_ACCOUNT,
		BLOB_STORAGE_KEY
	);
	const blobServiceClient = new BlobServiceClient(
		`https://${BLOB_STORAGE_ACCOUNT}.blob.core.windows.net`,
		sharedKeyCredential
	);
	return blobServiceClient.getContainerClient('uploads');
};

export const uploadHofImage = async (channelId: string, messageId: string, image: Buffer) => {
	const containerClient = createContainerClient();
	const blobName = `${channelId}/${messageId}-${crypto.randomUUID()}.jpg`;
	await containerClient.getBlockBlobClient(blobName).uploadData(image);
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
