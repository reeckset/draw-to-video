import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import DrawingCanvas from './DrawingCanvas';
import ACTION_TYPES from '../actions/ACTION_TYPES';
import Timeline from './Timeline';
import AudioPlayer from './AudioControls';
import { getActionIndexFromTimelineState } from '../utils/timelineSelectors';
import TopBar from './TopBar';

const { framerate } = require('../../common/recordingOptions');

const addEventListeners = (canvas, { addPoint, startStroke, stopDrawing }, getCurrentTimestamp) => {
    const mouseDownEventListener = (pageX, pageY) => {
        const mouseX = pageX - canvas.offsetLeft;
        const mouseY = pageY - canvas.offsetTop;

        startStroke({ point: { x: mouseX, y: mouseY }, timestamp: getCurrentTimestamp() });
    };

    const mouseMoveEventListener = (pageX, pageY) => {
        const mouseX = pageX - canvas.offsetLeft;
        const mouseY = pageY - canvas.offsetTop;

        addPoint({ point: { x: mouseX, y: mouseY }, timestamp: getCurrentTimestamp() });
    };

    const mouseStopEventListener = () => {
        stopDrawing();
    };


    canvas.addEventListener('mousedown', e => mouseDownEventListener(e.pageX, e.pageY));
    canvas.addEventListener('mousemove', e => mouseMoveEventListener(e.pageX, e.pageY));
    canvas.addEventListener('mouseup', mouseStopEventListener);
    canvas.addEventListener('mouseleave', mouseStopEventListener);
    canvas.addEventListener('touchstart', e => mouseDownEventListener(e.changedTouches[0].pageX, e.changedTouches[0].pageY));
    canvas.addEventListener('touchmove', e => mouseMoveEventListener(e.changedTouches[0].pageX, e.changedTouches[0].pageY));
    canvas.addEventListener('touchend', () => mouseStopEventListener);
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
