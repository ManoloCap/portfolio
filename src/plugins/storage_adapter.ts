import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { Media } from '@/collections/Media';

const vercel_blob_adapter = vercelBlobStorage({
    enabled: true,
    // Specify which collections should use Vercel Blob
    collections: {
    media: true,
    },
    // Vercel Blob read/write token from the environment
    token: process.env.BLOB_READ_WRITE_TOKEN,
    // Optional: handle uploads directly from the client
    clientUploads: true,
})

export default vercel_blob_adapter;