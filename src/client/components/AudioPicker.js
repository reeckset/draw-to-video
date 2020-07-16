import React from 'react';
import { Button } from '@material-ui/core';

const { dialog } = require('electron').remote;


const AudioPicker = ({ onSelectFile }) => (
    <>
        <Button
            onClick={async () => onSelectFile(
                (await dialog.showOpenDialog(
                    {
                        properties: ['openFile'],
                        filters: [
                            { name: 'Audio Files', extensions: ['mp3'] },
                        ],
                        title: 'Select Audio'
                    }
                )).filePaths[0]
            )}
        >
            Upload Audio File

        </Button>

    </>
);

export default AudioPicker;
