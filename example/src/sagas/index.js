import { all } from 'redux-saga/effects';
import authSagas from './authSagas';
import todoSagas from './todoSagas';

export default function* rootSaga() {
  yield all([
    authSagas(),
    todoSagas(),
  ]);
}
