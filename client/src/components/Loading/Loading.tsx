import { FC } from 'react';

import classes from './Loading.module.css';

const Loading: FC<{ width?: string; height?: string; color?: string }> = (
    props
) => {
    return (
        <span
            className={classes.loader}
            style={{
                width: props.width,
                height: props.height,
                borderColor: props.color || '#fff',
                borderBottomColor: 'transparent',
            }}
        ></span>
    );
};

export default Loading;
