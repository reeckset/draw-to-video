import React, { useEffect, useState } from 'react';
import useInterval from '../hooks/useInterval';
import renderCanvas from '../../common/canvasRenderer';

const Canvas = React.memo(React.forwardRef(({
    size
}, ref) => <canvas width={size.width} height={size.height} style={{ border: '1px solid #000000' }} ref={ref} />));


const DrawingCanvas = React.forwardRef(({
    refreshRate, drawingHistory, atActionIndex, size
}, ref) => {
    const [context, setContext] = useState(null);

    const [lastRenderedActionIndex, setLastRenderedActionIndex] = useState(0);

    useEffect(() => {
        ref.current && setContext(ref.current.getContext('2d'));
    }, [ref.current]);

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
