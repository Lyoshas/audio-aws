import express from 'express';
import {
    StartTranscriptionJobCommand,
} from '@aws-sdk/client-transcribe';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { randomBytes } from 'crypto';
import multer from 'multer';

import transcribeClient from './util/aws/transcribeClient.js';
import S3Client from './util/aws/S3Client.js';
import waitUntilTranscriptionIsDone from './util/aws/waitUntilTranscriptionIsDone.js';
import fileFilter from './util/multer/fileFilter.js';
import memoryStorage from './util/multer/memoryStorage.js';
import corsHandler from './util/cors/corsHandler.js';

const app = express();

app.use(corsHandler);

app.post(
    '/transcribe-video',
    multer({
        storage: memoryStorage,
        fileFilter,
        limits: { fileSize: 10 * 1024 * 1024 },
    }).single('audio'),
    async (req, res) => {
        if (!req.file) {
            res.status(400).json({ error: 'Invalid audio' });
        }

        // завантажуємо файл до S3
        const { originalname, mimetype, buffer } = req.file;

        const filename = `${randomBytes(4).toString('hex')}_${originalname}`;

        await S3Client.send(
            new PutObjectCommand({
                Bucket: 'lyoshas-audio-files',
                Key: filename,
                Body: buffer,
                ContentType: mimetype,
            })
        );

        // відправляємо запит до AWS Transcribe, щоб отримати транскрипцію
        const outputBucket = 'lyoshas-audio-transcripts';
        const jobName = `job-${randomBytes(8).toString('hex')}`;
        const data = await transcribeClient.send(
            new StartTranscriptionJobCommand({
                TranscriptionJobName: jobName,
                LanguageCode: 'en-US',
                Media: {
                    MediaFileUri: `s3://lyoshas-audio-files/${filename}`,
                },
                OutputBucketName: outputBucket,
            })
        );

        // чекаємо закінчення процесу транскрипції
        console.log('waiting...');
        await waitUntilTranscriptionIsDone(jobName);
        console.log('done!');

        // отримуємо результат транскрипції
        const response = await S3Client.send(new GetObjectCommand({
            Bucket: outputBucket,
            Key: jobName + '.json'
        }));
        const transcriptObject = JSON.parse(await response.Body.transformToString());

        console.log(transcriptObject.results.transcripts[0]);
        // відправляємо результат клієнту
        res.json(transcriptObject.results.transcripts[0]);
        // { transcript: string }
    }
);

app.listen(4000, () => console.log('listening on port 4000'));
