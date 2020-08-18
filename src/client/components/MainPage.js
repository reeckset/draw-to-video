import React, { useRef } from 'react';
import { connect } from 'react-redux';
import DrawingCanvas from './DrawingCanvas';
import ACTION_TYPES from '../actions/ACTION_TYPES';
import Timeline from './Timeline';
import AudioPlayer from './AudioControls';
import { getActionIndexFromTimelineState } from '../utils/timelineSelectors';
import TopBar from './TopBar';

const { framerate } = require('../../common/recordingOptions');

const MainPage = ({
    drawingHistory,
    selectedActionIndex,
    drawingControls,
    canvasSize,
    onTimelineSelect,
    timelineState,
    audioFile,
    isTouchModeOn
}) => {
    const canvasRef = useRef();
    const audioPlayerRef = useRef();

    const getCurrentTimestamp = () => (audioPlayerRef.current
        ? audioPlayerRef.current.currentTime : 1);

    return (
        <>
            <TopBar getCurrentTimestamp={getCurrentTimestamp} />
            {audioFile
                ? (
                    <AudioPlayer
                        key="audioPlayer"
                        filePath={audioFile}
                        width={canvasSize.width}
                        onSeek={onTimelineSelect}
                        ref={audioPlayerRef}
                    />
                )
                : (
                    <Timeline
                        width={canvasSize.width}
                        onTimelineSelect={onTimelineSelect}
                        timelineState={timelineState}
                    />
                )
            }
            <DrawingCanvas
                ref={canvasRef}
                refreshRate={framerate}
                size={canvasSize}
                drawingHistory={drawingHistory}
                atActionIndex={selectedActionIndex}
                drawingControls={drawingControls}
                getCurrentTimestamp={getCurrentTimestamp}
                isTouchModeOn={isTouchModeOn}
            />
        </>
    );
};

export default connect(state => ({
    drawingHistory: state.drawing.history,
    timelineState: state.drawing.timelineState,
    selectedActionIndex: getActionIndexFromTimelineState(state.drawing),
    canvasSize: { width: state.settings.canvasWidth, height: state.settings.canvasHeight },
    audioFile: state.drawing.audioFile,
    isTouchModeOn: state.settings.isTouchModeOn,
}), dispatch => ({
    onTimelineSelect: payload => dispatch({
        type: ACTION_TYPES.SET_TIMELINE_STATE,
        payload
    }),
    drawingControls: {
        startStroke: payload => dispatch({ type: ACTION_TYPES.START_STROKE, payload }),
        addPoint: payload => dispatch({ type: ACTION_TYPES.ADD_POINT, payload }),
        stopDrawing: () => dispatch({ type: ACTION_TYPES.STOP_DRAWING })
    }
}))(MainPage);
