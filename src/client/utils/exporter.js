const path = require('path');

const { spawn } = require('child_process');
const { remote } = require('electron');
const renderCanvas = require('../../common/canvasRenderer');


const fs = remote.require('fs');

const { framerate, CANVAS_ID } = require('../../common/recordingOptions');
const { OUTPUT_TMP_FOLDER, OUTPUT_FOLDER } = require('../../common/recordingOptions');

if (!fs.existsSync(OUTPUT_TMP_FOLDER)) {
    fs.mkdirSync(OUTPUT_TMP_FOLDER, { recursive: true });
}

const emptyOutputTmpFolder = () => {
    const files = fs.readdirSync(OUTPUT_TMP_FOLDER, { withFileTypes: true });
    console.log(files);
    files.forEach((file) => {
        const filePath = path.join(OUTPUT_TMP_FOLDER, file);
        if (!fs.lstatSync(filePath).isDirectory()) fs.unlinkSync(filePath);
    });
};

const canvasDataToImage = (frameNumber, img) => {
    const data = img.replace(/^data:image\/\w+;base64,/, '');
    const buf = new Buffer.from(data, 'base64');
    fs.writeFileSync(`${OUTPUT_TMP_FOLDER}/${String(frameNumber).padStart(5, '0')}.png`, buf);
};

const createImages = (drawingHistory, audioFile, canvas) => {
    console.log('exporting');
    const ctx = canvas.getContext('2d');
    if (audioFile) {
        for (let i = 0; i / framerate <= drawingHistory[drawingHistory.length - 1].timestamp; i++) {
            renderCanvas(
                ctx,
                drawingHistory,
                i / framerate,
                { useActionIndexAsTimestamp: true, fromActionIndex: Math.max(i - 1, 0) }
            );
            canvasDataToImage(i, canvas.toDataURL());
        }
    } else {
        drawingHistory.forEach((_, i) => {
            renderCanvas(ctx, drawingHistory, i, { fromActionIndex: Math.max(i - 1, 0) });
            canvasDataToImage(i, canvas.toDataURL());
        });
    }
};

const compileImagesWithFFMPEG = (audioPath) => {
    const child = spawn('ffmpeg', [
        '-framerate', `${framerate}`,
        '-i', `${OUTPUT_TMP_FOLDER}/%05d.png`,
        ...audioPath ? [
            '-i', `${audioPath}`,
            '-f', 'lavfi',
            '-i', 'color=c=black@0.0:size=2x2',
            '-filter_complex', '[0:v][2:v]overlay[v]', '-map', '[v]', '-map', '1:a', '-shortest'] : [],
        '-pix_fmt', 'yuv420p',
        '-y', `${OUTPUT_FOLDER}/output.mp4`]);

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (chunk) => {
        console.log(chunk);
    });
    child.stderr.setEncoding('utf8');
    child.stderr.on('data', (chunk) => {
        console.log(chunk);
    });

    child.on('close', (code) => {
        console.log(`FFMPEG DONE! Exited with code ${code}`);
        emptyOutputTmpFolder();
    });
};

const createVideo = ({ drawingHistory, audio }) => {
    const canvas = document.getElementById(CANVAS_ID);
    createImages(drawingHistory, audio, canvas);
    compileImagesWithFFMPEG(audio);
};

module.exports = createVideo;
