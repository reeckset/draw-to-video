import { canvasWidth, canvasHeight } from '../../common/recordingOptions';
import ACTION_TYPES from '../actions/ACTION_TYPES';

const initialState = {
    canvasWidth, canvasHeight, isTouchModeOn: false
};

export default (state = initialState, action) => {
    switch (action.type) {
    case ACTION_TYPES.TOGGLE_TOUCH_MODE:
        return { ...state, isTouchModeOn: !state.isTouchModeOn };
    default:
        return state;
    }
    return state;
};
