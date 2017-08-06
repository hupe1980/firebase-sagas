import { all, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { createAuthSaga } from 'firebase-sagas';
import todoSagas from './todoSagas';
import firebaseSagas from './firebaseSagas';

const authSaga = createAuthSaga(firebaseSagas, {
  signInMethods: [
    { type: 'signInWithEmailAndPassword' },
    { type: 'signInWithGoogle' },
  ],
  onSignInSuccess: function* onSignInSuccess() {
    yield put(push('/Todo'));
  },
  onSignOutSuccess: function* onSignOutSuccess() {
    yield put(push('/'));
  },
});

export default function* rootSaga() {
  yield all([
    authSaga(),
    todoSagas(),
  ]);
}
