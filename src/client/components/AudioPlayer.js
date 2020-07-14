import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = width => makeStyles(() => ({
    player: {
        width
    }
}));


const AudioControls = React.memo(React.forwardRef(({ file, width, onSeek }, ref) => {
    const classes = useStyles(width)();

    return (
        <>
            <audio
                src={URL.createObjectURL(file)}
                autoPlay
                controls
                ref={ref}
                className={classes.player}
                onTimeUpdate={() => onSeek(ref.current.currentTime)}
            />
        </>
    );
}));
export default AudioControls;
