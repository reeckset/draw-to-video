import React, { useEffect, useState } from 'react';
import useInterval from '../hooks/useInterval';
import renderCanvas from '../../common/canvasRenderer';
import recordingOptions from '../../common/recordingOptions';

const Canvas = React.memo(React.forwardRef(({
    size
}, ref) => (
    <canvas
        width={size.width}
        height={size.height}
        style={{ border: '1px solid #000000', touchAction: 'none' }}
        ref={ref}
        id={recordingOptions.CANVAS_ID}
    />
)));

const addEventListeners = (
    canvas, currentListeners, { addPoint, startStroke, stopDrawing }, getCurrentTimestamp, isTouchModeOn
) => {
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

    // remove listeners
    currentListeners.forEach(([id, func]) => canvas.removeEventListener(id, func));

    const nextListeners = [];
    const addListener = (id, func) => {
        canvas.addEventListener(id, func);
        nextListeners.push([id, func]);
    };

    if (isTouchModeOn) {
        addListener('touchstart', e => mouseDownEventListener(e.changedTouches[0].pageX, e.changedTouches[0].pageY));
        addListener('touchmove', e => mouseMoveEventListener(e.changedTouches[0].pageX, e.changedTouches[0].pageY));
        addListener('touchend', () => mouseStopEventListener());
    } else {
        addListener('mousedown', e => mouseDownEventListener(e.pageX, e.pageY));
        addListener('mousemove', e => mouseMoveEventListener(e.pageX, e.pageY));
        addListener('mouseup', mouseStopEventListener);
        addListener('mouseleave', mouseStopEventListener);
    }

    return nextListeners;
};

const DrawingCanvas = React.forwardRef(({
    refreshRate, drawingHistory, atActionIndex, size, drawingControls, getCurrentTimestamp, isTouchModeOn
}, ref) => {
    const [context, setContext] = useState(null);

    const [lastRenderedActionIndex, setLastRenderedActionIndex] = useState(0);

    const [currentListeners, setCurrentListeners] = useState([]);

    useEffect(() => {
        ref.current && setContext(ref.current.getContext('2d'));
    }, [ref.current]);

    useEffect(() => {
        setCurrentListeners(addEventListeners(
            ref.current,
            currentListeners,
            drawingControls,
            getCurrentTimestamp,
            isTouchModeOn
        ));
    }, [ref.current, isTouchModeOn]);

    useInterval(() => {
        if (context) {
            setLastRenderedActionIndex(
                renderCanvas(
                    context,
                    drawingHistory,
                    atActionIndex,
                    { fromActionIndex: lastRenderedActionIndex }
                )
            );
        }
    }, 1000 / refreshRate);

    return (
        <>
            <Canvas ref={ref} size={size} />
        </>
    );
});

export default DrawingCanvas;
