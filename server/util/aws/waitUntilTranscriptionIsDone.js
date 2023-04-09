import { GetTranscriptionJobCommand } from '@aws-sdk/client-transcribe';

import transcribeClient from './transcribeClient.js';

export default async function waitUntilTranscriptionIsDone(
    transcriptionJobName
) {
    let jobStatus;

    do {
        const jobData = await transcribeClient.send(
            new GetTranscriptionJobCommand({
                TranscriptionJobName: transcriptionJobName,
            })
        );

        jobStatus = jobData.TranscriptionJob.TranscriptionJobStatus;

        // чекаємо 1 секунду
        await new Promise((resolve) => setTimeout(resolve, 1000));
    } while (jobStatus === 'IN_PROGRESS');
}
