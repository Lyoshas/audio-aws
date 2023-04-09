import React, { FC } from 'react';

import classes from './CenterBlock.module.css';

const CenterBlock: FC<{ children: React.ReactNode }> = (props) => {
    return <div className={classes['center-block']}>
        {props.children}
    </div>
};

export default CenterBlock;
