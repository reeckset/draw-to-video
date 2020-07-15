import React, { useState, useEffect } from 'react';
import {
    makeStyles, FormControl, InputLabel, Select, MenuItem
} from '@material-ui/core';

const useStyles = width => makeStyles(() => ({
    wrapper: {
        width,
        display: 'flex',
        margin: '12px 0px',
    },
    speedPicker: {
        marginLeft: '24px',
        width: '200px',
    }
}));

const AudioTag = React.memo(React.forwardRef(({ file, onSeek }, ref) => (
    <audio
        src={URL.createObjectURL(file)}
        autoPlay
        controls
        ref={ref}
        style={{ width: '100%' }}
        onTimeUpdate={() => onSeek(ref.current.currentTime)}
    />
)));

const AudioControls = React.forwardRef(({ file, width, onSeek }, ref) => {
    const classes = useStyles(width)();

    const [playbackSpeed, setPlaybackSpeed] = useState(1);

    useEffect(() => {
        // eslint-disable-next-line no-param-reassign
        ref.current.playbackRate = playbackSpeed;
    }, [playbackSpeed]);

    return (
        <div className={classes.wrapper}>
            <AudioTag ref={ref} file={file} onSeek={onSeek} />
            <FormControl className={classes.speedPicker}>
                <InputLabel>Playback Speed</InputLabel>
                <Select
                    value={playbackSpeed}
                    onChange={e => setPlaybackSpeed(e.target.value)}
                >
                    <MenuItem value={0.1}>0.10</MenuItem>
                    <MenuItem value={0.25}>0.20</MenuItem>
                    <MenuItem value={0.5}>0.50</MenuItem>
                    <MenuItem value={0.75}>0.75</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
});
export default AudioControls;
