import { TranscribeClient } from '@aws-sdk/client-transcribe';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), 'config', '.env') });

const transcribeClient = new TranscribeClient({
    region: 'eu-west-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

export default transcribeClient;
