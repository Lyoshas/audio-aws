import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface MicrophoneState {
    isMicrophoneRecording: null | boolean;
    isRequestLoading: boolean;
    transcript: string | null
}

const initialState: MicrophoneState = {
    isMicrophoneRecording: null,
    isRequestLoading: false,
    transcript: null
};

const microphoneSlice = createSlice({
    name: 'microphone',
    initialState,
    reducers: {
        startRecording(state, action: PayloadAction<void>) {
            state.isMicrophoneRecording = true;
        },
        stopRecording(state, action: PayloadAction<void>) {
            state.isMicrophoneRecording = false;
        },
        setRequestLoading(state, action: PayloadAction<boolean>) {
            state.isRequestLoading = action.payload;
        },
        setTranscript(state, action: PayloadAction<string>) {
            state.transcript = action.payload;
        }
    },
});

export const microphoneActions = microphoneSlice.actions;

export default microphoneSlice;
