import ACTION_TYPES from './ACTION_TYPES';

export default lang => dispatch => dispatch({
  type: ACTION_TYPES.SET_LANG,
  payload: lang
});
