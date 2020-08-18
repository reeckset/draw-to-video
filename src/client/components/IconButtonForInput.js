import React from 'react';
import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    input: {
        visibility: 'hidden',
        width: 0,
        padding: 0,
        margin: 0,
    },
}));

const IconButtonForInput = React.forwardRef(({ children, ...props }, ref) => {
    const classes = useStyles();
    return (
        <>
            <label>
                <Button component="span">
                    {children}
                </Button>
                <input className={classes.input} ref={ref} {...props} />
            </label>

        </>
    );
});

export default IconButtonForInput;
