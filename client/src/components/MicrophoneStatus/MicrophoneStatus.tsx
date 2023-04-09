import { useSelector } from 'react-redux';

import classes from './MicrophoneStatus.module.css';
import { RootState } from '../../store';
import Loading from '../Loading/Loading';

const MicrophoneStatus = () => {
    const { isMicrophoneRecording, isRequestLoading } = useSelector(
        (state: RootState) => state.microphone
    );

    return (
        <div className={classes['microphone-status']}>
            {isRequestLoading ? (
                <Loading color="#000" />
            ) : (
                <p>
                    {isMicrophoneRecording
                        ? 'Відпустіть, щоб отримати транскрипцію'
                        : 'Зажміть мікрофон, щоб почати говорити'}
                </p>
            )}
        </div>
    );
};

export default MicrophoneStatus;
