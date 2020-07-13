const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const createVideo = require('./exporter');

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));

const publicDir = path.join(__dirname, '../../public');
const distDir = path.join(__dirname, '../../dist');

app.use(express.static(distDir));
app.use(express.static(publicDir));

app.post('/export', (req, res) => {
    createVideo(req.body);
    res.send('Done!');
});

app.listen(process.env.PORT || 3000, () => console.log(`Listening on port ${process.env.PORT || 3000}!`));
