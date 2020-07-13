const width = 1280;
const height = 720;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.setAttribute('width', width);
canvas.setAttribute('height', height);

const INPUT_TYPES = {DRAW: 'draw'};

/**
 * array of objects
 *    with shape:
 *    {
 *      type: draw,
 *      points: [{x: 0, y: 0, timestamp: 000000}, ...]
 *    }
 */
const drawingHistory = [];

let drawing = false;
canvas.addEventListener('mousedown', (e) => {
    const mouseX = e.pageX - canvas.offsetLeft;
    const mouseY = e.pageY - canvas.offsetTop;

    drawingHistory.push({
        type: INPUT_TYPES.DRAW,
        points: [{x: mouseX, y: mouseY, timestamp: Date.now()}],
    });
    drawing = true;
});

canvas.addEventListener('mousemove', (e) => {
    if(drawing){
        const mouseX = e.pageX - canvas.offsetLeft;
        const mouseY = e.pageY - canvas.offsetTop;

        drawingHistory[drawingHistory.length-1].points.push({x: mouseX, y: mouseY, timestamp: Date.now()});
    }
});

canvas.addEventListener('mouseup', (e) => {
    drawing = false;
});
canvas.addEventListener('mouseleave', (e) => {
    drawing = false;
});

setInterval(() => renderCanvas(ctx, drawingHistory), 30);

const exportHistory = () => {
    fetch('/export', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },  
        body: JSON.stringify(drawingHistory)
    })
}