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

        startStroke({ x: mouseX, y: mouseY, timestamp: Date.now() });
    });

    canvas.addEventListener('mousemove', (e) => {
        const mouseX = e.pageX - canvas.offsetLeft;
        const mouseY = e.pageY - canvas.offsetTop;

        addPoint({ x: mouseX, y: mouseY, timestamp: Date.now() });
    });

    canvas.addEventListener('mouseup', () => {
        stopDrawing();
    });
    canvas.addEventListener('mouseleave', () => {
        stopDrawing();
    });
};

const MainPage = ({
    drawingHistory, selectedTimestamp, drawingControls, canvasSize, onTimelineSelect
}) => {
    const canvasRef = useRef();

    useEffect(() => canvasRef.current && addEventListeners(canvasRef.current, drawingControls),
        [canvasRef.current]);

    return (
        <>
            <ExportButton drawingHistory={drawingHistory} />
            <Timeline width={canvasSize.width} onTimelineSelect={onTimelineSelect} />
            <DrawingCanvas
                ref={canvasRef}
                refreshRate={30}
                size={canvasSize}
                drawingHistory={drawingHistory}
                atTimestamp={selectedTimestamp}
            />
        </>
    );
};

export default connect(state => ({
    drawingHistory: state.drawing.history,
    selectedTimestamp: state.drawing.selectedTimestamp,
    canvasSize: { width: state.settings.canvasWidth, height: state.settings.canvasHeight }
}), dispatch => ({
    onTimelineSelect: payload => dispatch({ type: ACTION_TYPES.SET_SELECTED_TIMESTAMP, payload }),
    drawingControls: {
        startStroke: payload => dispatch({ type: ACTION_TYPES.START_STROKE, payload }),
        addPoint: payload => dispatch({ type: ACTION_TYPES.ADD_POINT, payload }),
        stopDrawing: () => dispatch({ type: ACTION_TYPES.STOP_DRAWING })
    }
}))(MainPage);
