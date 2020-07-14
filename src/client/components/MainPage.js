import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import DrawingCanvas from './DrawingCanvas';
import ACTION_TYPES from '../actions/ACTION_TYPES';
import Timeline from './Timeline';
import AudioPlayer from './AudioControls';
import { getActionIndexFromTimelineState } from '../selectors/timelineSelectors';
import TopBar from './TopBar';

const { framerate } = require('../../common/recordingOptions');

const addEventListeners = (canvas, { addPoint, startStroke, stopDrawing }, getCurrentTimestamp) => {
    canvas.addEventListener('mousedown', (e) => {
        const mouseX = e.pageX - canvas.offsetLeft;
        const mouseY = e.pageY - canvas.offsetTop;

        startStroke({ point: { x: mouseX, y: mouseY }, timestamp: getCurrentTimestamp() });
    });

    canvas.addEventListener('mousemove', (e) => {
        const mouseX = e.pageX - canvas.offsetLeft;
        const mouseY = e.pageY - canvas.offsetTop;

        addPoint({ point: { x: mouseX, y: mouseY }, timestamp: getCurrentTimestamp() });
    });

    canvas.addEventListener('mouseup', () => {
        stopDrawing();
    });
    canvas.addEventListener('mouseleave', () => {
        stopDrawing();
    });
};

const MainPage = ({
    drawingHistory,
    selectedActionIndex,
    drawingControls,
    canvasSize,
    onTimelineSelect,
    timelineState,
    audioFile,
}) => {
    const canvasRef = useRef();
    const audioPlayerRef = useRef();

    const getCurrentTimestamp = () => (audioPlayerRef.current
        ? audioPlayerRef.current.currentTime : 1);

    useEffect(() => canvasRef.current
        && addEventListeners(canvasRef.current, drawingControls, getCurrentTimestamp),
    [canvasRef.current]);

    return (
        <>
            <TopBar />
            {audioFile
                ? (
                    <AudioPlayer
                        key="audioPlayer"
                        file={audioFile}
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
