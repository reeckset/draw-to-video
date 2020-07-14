import React from 'react';
import { Button } from '@material-ui/core';

const DrawingCanvas = ({ drawingHistory, audioFile }) => {
    const exportDrawing = () => {
        console.log('1');
        const form = new FormData();
        console.log('2');
        form.append('audio-file', audioFile);
        console.log('3');
        form.append('drawing-history', JSON.stringify(drawingHistory));
        console.log('4');

        console.log(form);

        fetch('/export', {
            method: 'POST',
            body: form
        });
    };

    return (
        <>
            <Button onClick={exportDrawing}>Export</Button>
        </>
    );
};

export default DrawingCanvas;
