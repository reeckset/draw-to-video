import ACTION_TYPES from '../actions/ACTION_TYPES';

const initialState = {
    canvasWidth: 1280,
    canvasHeight: 720,
};

export default (state = initialState, action) => {
    switch (action.type) {
    default:
        return state;
    }
    return state;
};
