import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import DrawingCanvas from './DrawingCanvas';
import ExportButton from './ExportButton';
import ACTION_TYPES from '../actions/ACTION_TYPES';
import Timeline from './Timeline';

const addEventListeners = (canvas, { addPoint, startStroke, stopDrawing }) => {
    canvas.addEventListener('mousedown', (e) => {
        const mouseX = e.pageX - canvas.offsetLeft;
        const mouseY = e.pageY - canvas.offsetTop;

        startStroke({ x: mouseX, y: mouseY });
    });

    canvas.addEventListener('mousemove', (e) => {
        const mouseX = e.pageX - canvas.offsetLeft;
        const mouseY = e.pageY - canvas.offsetTop;

        addPoint({ x: mouseX, y: mouseY });
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
    timelineState
}) => {
    const canvasRef = useRef();

    useEffect(() => canvasRef.current && addEventListeners(canvasRef.current, drawingControls),
        [canvasRef.current]);

    return (
        <>
            <ExportButton drawingHistory={drawingHistory} />
            <Timeline
                width={canvasSize.width}
                onTimelineSelect={onTimelineSelect}
                timelineState={timelineState}
            />
            <DrawingCanvas
                ref={canvasRef}
                refreshRate={30}
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
    selectedActionIndex: Math.round(
        state.drawing.timelineState * (state.drawing.history.length - 1)
    ),
    canvasSize: { width: state.settings.canvasWidth, height: state.settings.canvasHeight }
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
