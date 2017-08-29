import createFirebaseSagas, { FirebaseSagas } from './sagas/createFirebaseSagas';
import createQuery, { Query } from './sagas/createQuery';
import createAuthSaga from './sagas/createAuthSaga';
import firebaseSagasReducer, { authReducer, configReducer } from './reducers';
import selectors from './selectors';
import types, { authActions } from './actions';
import constants from './constants';
import withSignIn from './containers';

export default createFirebaseSagas;

export {
  FirebaseSagas,
  createQuery,
  Query,
  createAuthSaga,
  firebaseSagasReducer,
  authReducer,
  configReducer,
  selectors,
  types,
  authActions,
  constants,
  withSignIn,
};
