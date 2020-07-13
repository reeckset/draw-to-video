const express = require('express');
const app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const { createCanvas } = require('canvas');
const canvas = createCanvas(1280, 720);
const ctx = canvas.getContext('2d');
const renderCanvas = require('../client/canvasRenderer');
const port = 3000;
const fs = require('fs');
const { spawn } = require('child_process');

const OUTPUT_FOLDER = 'output';
const OUTPUT_TMP_FOLDER = 'output/tmp';

if (!fs.existsSync(OUTPUT_TMP_FOLDER)){
    fs.mkdirSync(OUTPUT_TMP_FOLDER);
}

app.use(express.static('client'));

app.post('/export', (req, res) => {
    createVideo(req.body);
    res.send('Hello World!');
});

app.listen(3000);

const createVideo = (drawingHistory) => {
    emptyOutputFolder();
    createImages(drawingHistory);
    compileImagesWithFFMPEG();
}

const createImages = drawingHistory => {
    console.log('exporting');

    let frameCounter = 0;

    for(const event of drawingHistory){
        for(const point of event.points){
            renderCanvas(ctx, drawingHistory, point.timestamp);
            canvasDataToImage(frameCounter++, canvas.toDataURL());
        }
    }
}


const canvasDataToImage = (frameNumber, img) => {
    var data = img.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer.from(data, 'base64');
    fs.writeFileSync(`${OUTPUT_TMP_FOLDER}/${String(frameNumber).padStart(5, 0)}.png`, buf);
}

const compileImagesWithFFMPEG = () => {
    
    const child = spawn('ffmpeg', [`-framerate`, `60`, `-i`, `${OUTPUT_TMP_FOLDER}/%05d.png`, `-pix_fmt`, `yuv420p`, `-y`, `output/output.mp4`]);

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (chunk) => {
        console.log(chunk);
    });

    child.on('close', (code) => {
        console.log(`FFMPEG DONE! Exited with code ${code}`);
    });
}

const emptyOutputFolder = () => {
    const files = fs.readdirSync(OUTPUT_FOLDER, { withFileTypes: true });

    for (const file of files) {
        if(file.isFile())
        fs.unlinkSync(path.join(OUTPUT_FOLDER, file));
    }
}