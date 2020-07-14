import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    input: {
        display: 'none',
    },
}));

const IconButtonForInput = ({ iconComponent, children }) => {
    const classes = useStyles();
    return (
        <>
            <label>
                {iconComponent}
                <div className={classes.input}>
                    {children}
                </div>
            </label>
        </>
    );
};

export default IconButtonForInput;
