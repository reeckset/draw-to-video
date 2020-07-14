import React, { useRef } from 'react';

const AudioPicker = ({ onSelectFile }) => {
    const filePickerRef = useRef();

    return (
        <>
            <input
                type="file"
                name="Upload Audio"
                ref={filePickerRef}
                onChange={() => onSelectFile(filePickerRef.current.files[0])}
            />
        </>
    );
};

export default AudioPicker;
