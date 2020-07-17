import React, { useRef } from 'react';
import {
    makeStyles, IconButton
} from '@material-ui/core';
import { connect } from 'react-redux';
import {
    ColorLens as ColorLensIcon, TouchApp as TouchAppIcon, Mouse as MouseIcon, ClearAll as ClearAllIcon
} from '@material-ui/icons';
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
    drawingHistory, audioFile, setAudioFile, setColor, color, clearCanvas, toggleTouchMode, isTouchModeOn
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
            <IconButton aria-label="clear canvas" onClick={clearCanvas}>
                <ClearAllIcon fontSize="large" />
            </IconButton>
            <IconButton aria-label="toggle touch mode" onClick={toggleTouchMode}>
                {isTouchModeOn ? <TouchAppIcon color="primary" /> : <MouseIcon color="primary" />}
            </IconButton>
        </div>
    );
};

export default connect(state => ({
    drawingHistory: state.drawing.history,
    audioFile: state.drawing.audioFile,
    color: state.drawing.brushColor,
    isTouchModeOn: state.settings.isTouchModeOn,
}), dispatch => ({
    setAudioFile: payload => dispatch({ type: ACTION_TYPES.SET_AUDIO, payload }),
    setColor: payload => dispatch({ type: ACTION_TYPES.SET_BRUSH_COLOR, payload }),
    clearCanvas: () => dispatch({ type: ACTION_TYPES.CLEAR_CANVAS }),
    toggleTouchMode: () => dispatch({ type: ACTION_TYPES.TOGGLE_TOUCH_MODE })
}))(TopBar);
