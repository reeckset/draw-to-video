import React, { useRef } from 'react';
import {
    makeStyles, IconButton
} from '@material-ui/core';
import { connect } from 'react-redux';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import AudioPicker from './AudioPicker';
import ExportButton from './ExportButton';
import ACTION_TYPES from '../actions/ACTION_TYPES';
import IconButtonForInput from './IconButtonForInput';

const useStyles = makeStyles(() => ({
    wrapper: {
        width: '100%',
        display: 'flex',
        margin: '12px 0px',
        alignItems: 'center',
        '& > *': {
            marginLeft: '12px',
        }
    },
}));

const TopBar = ({
    drawingHistory, audioFile, setAudioFile, setColor, color, clearCanvas
}) => {
    const classes = useStyles();

    const ref = useRef();

    return (
        <div className={classes.wrapper}>
            <ExportButton drawingHistory={drawingHistory} audioFile={audioFile} />
            <AudioPicker onSelectFile={setAudioFile} />
            <IconButtonForInput iconComponent={<ColorLensIcon style={{ color }} />}>
                <input ref={ref} type="color" value={color} onChange={() => setColor(ref.current.value)} />
            </IconButtonForInput>
            <IconButton aria-label="clear canvas" onClick={clearCanvas} className={classes.margin}>
                <ClearAllIcon fontSize="large" />
            </IconButton>
        </div>
    );
};

export default connect(state => ({
    drawingHistory: state.drawing.history,
    audioFile: state.drawing.audioFile,
    color: state.drawing.brushColor,
}), dispatch => ({
    setAudioFile: payload => dispatch({ type: ACTION_TYPES.SET_AUDIO, payload }),
    setColor: payload => dispatch({ type: ACTION_TYPES.SET_BRUSH_COLOR, payload }),
    clearCanvas: () => dispatch({ type: ACTION_TYPES.CLEAR_CANVAS })
}))(TopBar);
