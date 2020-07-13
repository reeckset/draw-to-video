import DRAW_TYPES from '../../common/DRAW_TYPES';
import ACTION_TYPES from '../actions/ACTION_TYPES';

const initialState = {
    history: [],
    selectedTimestamp: null,
    isDrawing: false,
    brushColor: '#000000',
};

/**
 * history: [
 *      {
 *          type: DRAW_TYPES._,
 *          points: [{x, y, timestamp}],
 *          brushColor: '#000000',
 *      }
 * ]
 */

export default (state = initialState, action) => {
    switch (action.type) {
    case ACTION_TYPES.ADD_POINT:
        if (state.history.length > 0 && state.isDrawing) {
            const newHistory = [...state.history];
            const oldDrawEvent = newHistory.pop();
            newHistory.push({
                ...oldDrawEvent,
                points: [...oldDrawEvent.points, action.payload]
            });
            return { ...state, history: newHistory };
        }
        break;
    case ACTION_TYPES.START_STROKE:
        return {
            ...state,
            isDrawing: true,
            history: [...state.history, {
                brushColor: state.brushColor,
                type: DRAW_TYPES.DRAW,
                points: [action.payload]
            }]
        };
    case ACTION_TYPES.SET_SELECTED_TIMESTAMP:
        return {
            ...state,
            selectedTimestamp: action.payload
        };
    case ACTION_TYPES.STOP_DRAWING:
        return { ...state, isDrawing: false };
    case ACTION_TYPES.SET_BRUSH_COLOR:
        return { ...state, brushColor: action.payload };
    default:
        return state;
    }
    return state;
};
