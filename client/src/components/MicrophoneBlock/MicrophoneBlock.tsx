import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';

import classes from './MicrophoneBlock.module.css';
import { microphoneActions } from '../../store/slices/microphone';

let audioChunks: Blob[] = [];

const MicrophoneBlock = () => {
    const dispatch = useDispatch();
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
        null
    );
    
    const handleDataAvailable = useCallback((event: BlobEvent) => {
        audioChunks.push(event.data);
    }, [audioChunks]);

    useEffect(() => {
        const run = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });

            setMediaRecorder(new MediaRecorder(stream));
        };

        run();
    }, []);

    const handleRecordingStop = useCallback(async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });

        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.mp3');

        dispatch(microphoneActions.setRequestLoading(true));
        const data = await fetch('http://localhost:4000/transcribe-audio', {
            method: 'POST',
            body: formData
        }).then(response => response.json());
        dispatch(microphoneActions.setRequestLoading(false));

        dispatch(microphoneActions.setTranscript(data.transcript));

        audioChunks.length = 0;
        mediaRecorder?.removeEventListener('dataavailable', handleDataAvailable);
    }, [audioChunks]);

    const handleMouseDown = () => {
        dispatch(microphoneActions.startRecording());

        if (!mediaRecorder) return;

        mediaRecorder.addEventListener('dataavailable', handleDataAvailable);

        mediaRecorder.start();

        mediaRecorder.addEventListener('stop', handleRecordingStop, {
            once: true,
        });
    };

    const handleMouseUp = () => {
        dispatch(microphoneActions.stopRecording());

        if (!mediaRecorder) return;

        mediaRecorder.stop();
    };

    return (
        <div
            className={classes['microphone-block']}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <img
                className={classes['microphone-image']}
                src="microphone.svg"
                alt="Microphone image"
            />
        </div>
    );
};

export default MicrophoneBlock;
