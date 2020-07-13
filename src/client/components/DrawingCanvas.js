import React, { useEffect, useState } from 'react';
import useInterval from '../hooks/useInterval';
import renderCanvas from '../../common/canvasRenderer';

const DrawingCanvas = React.forwardRef(({
    refreshRate, drawingHistory, atTimestamp, size
}, ref) => {
    const [context, setContext] = useState(null);

    useEffect(() => {
        ref.current && setContext(ref.current.getContext('2d'));
    }, [ref.current]);

    useInterval(() => {
        if (context) {
            renderCanvas(context, drawingHistory, atTimestamp);
        }
    }, 1000 / refreshRate);

    return (
        <>
            <canvas width={size.width} height={size.height} style={{ border: '1px solid #000000' }} ref={ref} />
        </>
    );
});

export default DrawingCanvas;
