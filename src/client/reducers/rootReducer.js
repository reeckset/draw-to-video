import { combineReducers } from 'redux';
import drawing from './drawingReducer';
import settings from './settingsReducer';

export default combineReducers({
    drawing, settings
});
