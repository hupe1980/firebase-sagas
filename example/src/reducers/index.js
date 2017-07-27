import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as router } from 'react-router-redux';
import auth from './authReducer';
import todo from './todoReducer';

const rootReducer = combineReducers({
  form,
  router,
  auth,
  todo,
});

export default rootReducer;
