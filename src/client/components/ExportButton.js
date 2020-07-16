import React from 'react';
import { Button } from '@material-ui/core';
import createVideo from '../utils/exporter';

const ExportButton = ({ drawingHistory, audioFile }) => (
    <div>
        <Button
            onClick={() => createVideo({ audio: audioFile, drawingHistory })}
            color="primary"
            variant="contained"
            component="span"
        >
            Export
        </Button>
    </div>
);

export default ExportButton;
