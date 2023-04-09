import { useSelector } from 'react-redux';

import classes from './TranscriptionBlock.module.css';
import { RootState } from '../../store';

const TranscriptionBlock = () => {
    const transcript = useSelector((state: RootState) => state.microphone.transcript);

    return <div className={classes['transcription-block']}>
        <h3>Результат перетворення звуку в текст:</h3>
        <p>{transcript || 'Зачекайте...'}</p>
    </div>;
};

export default TranscriptionBlock;
