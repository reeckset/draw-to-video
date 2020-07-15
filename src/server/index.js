const express = require('express');

const app = express();
const path = require('path');

const multer = require('multer');

const bodyParser = require('body-parser');
const { OUTPUT_TMP_FOLDER } = require('../common/recordingOptions');

const upload = multer({ dest: OUTPUT_TMP_FOLDER });

const createVideo = require('./exporter');

const publicDir = path.join(__dirname, '../../public');
const distDir = path.join(__dirname, '../../dist');

app.use(express.static(distDir));
app.use(express.static(publicDir));
app.use((err, req, res, next) => { if (err) console.log(err); next(err); });


app.use(bodyParser.json({ limit: '200mb' }));
// set to true for passing array objects from form to route
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser({ keepExtensions: true, uploadDir: OUTPUT_TMP_FOLDER, limit: '200mb' }));


app.post('/export', upload.single('audio-file'), (req, res) => {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any
    console.log(req);
    createVideo({ audio: req.file && req.file.path, drawingHistory: JSON.parse(req.body['drawing-history']) });
    res.send('DONE!');
});


app.listen(process.env.PORT || 3000, () => console.log(`Listening on port ${process.env.PORT || 3000}!`));
