import React from 'react';
import { Button } from '@material-ui/core';

const { dialog } = require('electron').remote;

const fs = require('electron').remote.require('fs');
const dataurl = require('dataurl');

const createURL = filePath => dataurl.convert({ data: fs.readFileSync(filePath), mimetype: 'image/png' });

const ImagePicker = ({ onSelectFile }) => (
    <>
        <Button
            onClick={async () => {
                const path = (await dialog.showOpenDialog(
                    {
                        properties: ['openFile'],
                        filters: [
                            { name: 'Image Files', extensions: ['png', 'jpg'] },
                        ],
                        title: 'Select Image'
                    }
                )).filePaths[0];
                const image = new Image();
                image.onload = () => {
                    onSelectFile(image);
                };
                image.src = createURL(path);
            }}
        >
            Upload Image

        </Button>

    </>
);

export default ImagePicker;
