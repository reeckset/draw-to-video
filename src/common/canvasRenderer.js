const RENDER_ACTIONS = require('./RENDER_ACTIONS');

const clearCanvas = ctx => ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

const renderCanvas = (ctx, drawingHistory, untilActionIndex, useActionIndexAsTimestamp) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#ffffff';
    clearCanvas(ctx);

    ctx.lineJoin = 'round';
    ctx.lineWidth = 5;

    for (let i = 0; i < drawingHistory.length; i++) {
        const event = drawingHistory[i];
        if (i > untilActionIndex && !useActionIndexAsTimestamp) break;
        if (event.timestamp > untilActionIndex && useActionIndexAsTimestamp) break;

        if (event.action === RENDER_ACTIONS.ADD_POINT) {
            ctx.lineTo(event.point.x, event.point.y);
            ctx.stroke();
        }

        if (event.action === RENDER_ACTIONS.START_STROKE) {
            ctx.beginPath();
            ctx.strokeStyle = event.color;
            ctx.moveTo(event.point.x, event.point.y);
        }


        if (event.action === RENDER_ACTIONS.CLEAR_CANVAS) {
            clearCanvas(ctx);
        }
    }
};

if (module) module.exports = renderCanvas;
