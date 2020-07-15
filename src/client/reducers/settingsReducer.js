import { canvasWidth, canvasHeight } from '../../common/recordingOptions';

const initialState = {
    canvasWidth, canvasHeight
};

export default (state = initialState, action) => {
    switch (action.type) {
    default:
        return state;
    }
    return state;
};
