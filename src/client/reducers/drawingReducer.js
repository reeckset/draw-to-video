import ACTION_TYPES from '../actions/ACTION_TYPES';

const RENDER_ACTIONS = require('../../common/RENDER_ACTIONS');

const initialState = {
    history: [],
    timelineState: 1,
    isDrawing: false,
    brushColor: '#000000',
};

/**
 * history: [
 *      {
 *          action: ACTION_TYPE.,
 *          ...payload (may be point ({x, y}), color, etc)
 *      }
 * ]
 */


const getHistoryUntilCurrentTimeline = ({ history, timelineState }) => {
    const currentActionIndex = Math.round(timelineState * history.length);
    return history.slice(0, currentActionIndex);
};

export default (state = initialState, action) => {
    switch (action.type) {
    case ACTION_TYPES.ADD_POINT:
        if (state.history.length > 0 && state.isDrawing) {
            return {
                ...state,
                timelineState: 1,
                history: [...getHistoryUntilCurrentTimeline(state), {
                    action: RENDER_ACTIONS.ADD_POINT,
                    point: action.payload,
                }]
            };
        }
        break;
    case ACTION_TYPES.START_STROKE:
        return {
            ...state,
            isDrawing: true,
            timelineState: 1,
            history: [...getHistoryUntilCurrentTimeline(state), {
                action: RENDER_ACTIONS.START_STROKE,
                point: action.payload
            }]
        };
    case ACTION_TYPES.SET_TIMELINE_STATE:
        return {
            ...state,
            timelineState: action.payload
        };
    case ACTION_TYPES.STOP_DRAWING:
        return { ...state, isDrawing: false };
    case ACTION_TYPES.SET_BRUSH_COLOR:
        return {
            ...state,
            brushColor: action.payload,
            history: [...getHistoryUntilCurrentTimeline(state), {
                action: RENDER_ACTIONS.SET_BRUSH_COLOR,
                color: state.brushColor
            }]
        };
    default:
        return state;
    }
    return state;
};
