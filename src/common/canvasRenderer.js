const RENDER_ACTIONS = require('./RENDER_ACTIONS');

const clearCanvas = ctx => ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

const renderCanvas = (
    ctx,
    drawingHistory,
    untilActionIndex,
    {
        useActionIndexAsTimestamp,
        fromActionIndex = 0
    }
) => {
    const startFromAction = (
        drawingHistory.length <= fromActionIndex
        || untilActionIndex < fromActionIndex)
        ? 0 : fromActionIndex;

    if (startFromAction === 0) {
        clearCanvas(ctx);
        ctx.fillStyle = '#ffffff';

        ctx.lineJoin = 'round';
        ctx.lineWidth = 5;
    }

    for (let i = startFromAction; i < drawingHistory.length; i++) {
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

    return Math.max(drawingHistory.length - 1, 0);
};

if (module) module.exports = renderCanvas;
