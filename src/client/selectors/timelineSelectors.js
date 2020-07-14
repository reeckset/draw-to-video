// comparatorFunc receives an array element and the target value and must return -1, 0 or 1
const flooredBinarySearch = (array, targetValue, comparatorFunc) => {
    let startIndex = 0;
    let endIndex = array.length - 1;

    if (array.length === 0) return 0;

    if (comparatorFunc(array[endIndex], targetValue) === -1) return endIndex;

    while (endIndex - startIndex > 1) {
        const mid = Math.floor((startIndex + endIndex) / 2);

        const comparison = comparatorFunc(array[mid], targetValue);
        if (comparison === -1) {
            startIndex = mid;
        } else if (comparison === 1) {
            endIndex = mid;
        } else {
            return mid;
        }
    }

    return startIndex;
};

const getActionIndexFromTimelineState = (drawingState) => {
    if (drawingState.timelineState === null) return drawingState.history.length - 1;

    if (drawingState.audioFile) {
        return flooredBinarySearch(
            drawingState.history,
            drawingState.timelineState,
            (event, timelineState) => {
                if (event.timestamp < timelineState) return -1;
                if (event.timestamp > timelineState) return 1;
                return 0;
            }
        );
    }
    return Math.round(
        drawingState.timelineState * (drawingState.history.length - 1)
    );
};

module.exports = { getActionIndexFromTimelineState };
