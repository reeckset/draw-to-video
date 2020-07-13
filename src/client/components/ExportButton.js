import React from 'react';
import { Button } from '@material-ui/core';

const DrawingCanvas = ({ drawingHistory }) => {
    const exportDrawing = () => {
        fetch('/export', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(drawingHistory)
        });
    };

    return (
        <>
            <Button onClick={exportDrawing}>Export</Button>
        </>
    );
};

export default DrawingCanvas;
