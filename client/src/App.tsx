import { useSelector } from 'react-redux';

import './App.css';
import CenterBlock from './components/CenterBlock/CenterBlock';
import MicrophoneBlock from './components/MicrophoneBlock/MicrophoneBlock';
import MicrophoneStatus from './components/MicrophoneStatus/MicrophoneStatus';
import TranscriptionBlock from './components/TranscriptionBlock/TranscriptionBlock';
import { RootState } from './store';

function App() {
    const { isMicrophoneRecording, isRequestLoading } = useSelector(
        (state: RootState) => state.microphone
    );

    return (
        <CenterBlock>
            <MicrophoneBlock />
            <MicrophoneStatus />
            {/*isRecording can be null*/}
            {isMicrophoneRecording === false && !isRequestLoading && (
                <TranscriptionBlock />
            )}
        </CenterBlock>
    );
}

export default App;
