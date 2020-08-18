import ACTION_TYPES from '../actions/ACTION_TYPES';
import { getActionIndexFromTimelineState } from '../utils/timelineSelectors';

const RENDER_ACTIONS = require('../../common/RENDER_ACTIONS');

const initialState = {
    history: [],
    timelineState: null,
    isDrawing: false,
    brushColor: '#000000',
    audioFile: null,
};

/**
 * history: [
 *      {
 *          action: ACTION_TYPE.,
 *          ...payload (may be point ({x, y}), color, etc)
 *      }
 * ]
 */


const getHistoryUntilCurrentTimeline = (drawingState) => {
    const currentActionIndex = getActionIndexFromTimelineState(drawingState);
    return drawingState.history.slice(0, currentActionIndex + 1);
};

export default (state = initialState, action) => {
    switch (action.type) {
    case ACTION_TYPES.ADD_POINT:
        if (state.history.length > 0 && state.isDrawing) {
            return {
                ...state,
                timelineState: null,
                history: [...getHistoryUntilCurrentTimeline(state), {
                    ...action.payload,
                    action: RENDER_ACTIONS.ADD_POINT,
                }]
            };
        }
        break;
    case ACTION_TYPES.START_STROKE:
        return {
            ...state,
            isDrawing: true,
            timelineState: null,
            history: [...getHistoryUntilCurrentTimeline(state), {
                ...action.payload,
                color: state.brushColor,
                action: RENDER_ACTIONS.START_STROKE,
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
        };
    case ACTION_TYPES.SET_AUDIO:
        return {
            ...state,
            audioFile: action.payload,
            timelineState: null,
            history: [],
        };

    case ACTION_TYPES.CLEAR_CANVAS:
        return {
            ...state,
            history: [...getHistoryUntilCurrentTimeline(state), {
                action: RENDER_ACTIONS.CLEAR_CANVAS,
                ...action.payload
            }],
        };

    default:
        return state;
    }
    return state;
};
