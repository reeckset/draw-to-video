const RENDER_ACTIONS = require('./RENDER_ACTIONS');

const renderCanvas = (ctx, drawingHistory, untilActionIndex, useActionIndexAsTimestamp) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.strokeStyle = '#df4b26';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 5;

    for (let i = 0; i < drawingHistory.length; i++) {
        const event = drawingHistory[i];
        if (i > untilActionIndex && !useActionIndexAsTimestamp) break;
        if (event.timestamp > untilActionIndex && useActionIndexAsTimestamp) break;

        if (event.action === RENDER_ACTIONS.ADD_POINT) {
            ctx.lineTo(event.point.x, event.point.y);
        } else {
            ctx.stroke();
        }

        if (event.action === RENDER_ACTIONS.START_STROKE) {
            ctx.beginPath();
            ctx.moveTo(event.point.x, event.point.y);
        }

        if (event.action === RENDER_ACTIONS.SET_BRUSH_COLOR) {
            ctx.strokeStyle = event.brushColor;
        }
    }
};

if (module) module.exports = renderCanvas;
