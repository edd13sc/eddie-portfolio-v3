import { Storage } from '@google-cloud/storage';
const storage = new Storage({ keyFilename: '/path/to/key.json', projectId: 'circular-curve-460519-e5' });
const bucketName = 'engineered-imagination';
export const googleBucket = storage?.bucket(bucketName);
