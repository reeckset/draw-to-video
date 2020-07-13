const path = require('path');
const { createCanvas } = require('canvas');

const canvas = createCanvas(1280, 720);
const ctx = canvas.getContext('2d');
const fs = require('fs');
const { spawn } = require('child_process');
const renderCanvas = require('../common/canvasRenderer');

const OUTPUT_FOLDER = 'output';
const OUTPUT_TMP_FOLDER = 'output/tmp';

if (!fs.existsSync(OUTPUT_TMP_FOLDER)) {
    fs.mkdirSync(OUTPUT_TMP_FOLDER, { recursive: true });
}

const emptyOutputFolder = () => {
    const files = fs.readdirSync(OUTPUT_FOLDER, { withFileTypes: true });

    files.forEach((file) => {
        if (file.isFile()) fs.unlinkSync(path.join(OUTPUT_FOLDER, file));
    });
};

const canvasDataToImage = (frameNumber, img) => {
    const data = img.replace(/^data:image\/\w+;base64,/, '');
    const buf = new Buffer.from(data, 'base64');
    fs.writeFileSync(`${OUTPUT_TMP_FOLDER}/${String(frameNumber).padStart(5, 0)}.png`, buf);
};

const createImages = (drawingHistory) => {
    console.log('exporting');

    let frameCounter = 0;
    drawingHistory.forEach((event) => {
        event.points.forEach((point) => {
            renderCanvas(ctx, drawingHistory, point.timestamp);
            canvasDataToImage(frameCounter++, canvas.toDataURL());
        });
    });
};

const compileImagesWithFFMPEG = () => {
    const child = spawn('ffmpeg', ['-framerate', '60', '-i', `${OUTPUT_TMP_FOLDER}/%05d.png`, '-pix_fmt', 'yuv420p', '-y', 'output/output.mp4']);

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (chunk) => {
        console.log(chunk);
    });

    child.on('close', (code) => {
        console.log(`FFMPEG DONE! Exited with code ${code}`);
    });
};

const createVideo = (drawingHistory) => {
    emptyOutputFolder();
    createImages(drawingHistory);
    compileImagesWithFFMPEG();
};

module.exports = createVideo;
