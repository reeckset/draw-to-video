import React from 'react';
import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    input: {
        display: 'none',
    },
}));

const ButtonForInput = ({ text, children }) => {
    const classes = useStyles();
    return (
        <>
            <label>
                <Button variant="contained" component="span">
                    {text}
                </Button>
                <div className={classes.input}>
                    {children}
                </div>
            </label>
        </>
    );
};

export default ButtonForInput;
