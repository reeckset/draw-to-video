const renderCanvas = (ctx, drawingHistory, untilTimestamp) => {

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
    ctx.strokeStyle = "#df4b26";
    ctx.lineJoin = "round";
    ctx.lineWidth = 5;

    let finishedRendering = false;
            
    for(const event of drawingHistory) {	
        if(!event.points || event.points.length === 0) continue;	
        
        ctx.beginPath();
        ctx.moveTo(event.points[0].x, event.points[0].y);
        for(const point of event.points){
            if(untilTimestamp && point.timestamp > untilTimestamp){
                finishedRendering = true;
                break;
            }
            ctx.lineTo(point.x, point.y);
        }

        ctx.stroke();
        
        if(finishedRendering) break;
    }
}

if(module) module.exports = renderCanvas;