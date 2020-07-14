import React from 'react';
import { Button } from '@material-ui/core';

const DrawingCanvas = ({ drawingHistory, audioFile }) => {
    const exportDrawing = () => {
        const form = new FormData();
        form.append('audio-file', audioFile);
        form.append('drawing-history', JSON.stringify(drawingHistory));

        fetch('/export', {
            method: 'POST',
            body: form
        });
    };

    return (
        <div><Button onClick={exportDrawing} color="primary" variant="contained" component="span">Export</Button></div>
    );
};

export default DrawingCanvas;
