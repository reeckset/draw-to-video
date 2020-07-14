import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import ButtonForInput from './ButtonForInput';

const useStyles = makeStyles(() => ({
    input: {
        display: 'none',
    },
}));

const AudioPicker = ({ onSelectFile }) => {
    const filePickerRef = useRef();
    const classes = useStyles();
    return (
        <>
            <ButtonForInput text="Upload Audio File">
                <input
                    type="file"
                    ref={filePickerRef}
                    className={classes.input}
                    onChange={() => onSelectFile(filePickerRef.current.files[0])}
                />
            </ButtonForInput>
        </>
    );
};

export default AudioPicker;
