import { configureStore } from '@reduxjs/toolkit';

import microphoneSlice from './slices/microphone';

const store = configureStore({
    reducer: {
        microphone: microphoneSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
