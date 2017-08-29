import { combineReducers } from 'redux';
import authReducer from './authReducer';
import configReducer from './configReducer';

const reducer = combineReducers({
  auth: authReducer,
  config: configReducer,
});


export default reducer;

export {
  authReducer,
  configReducer,
};
