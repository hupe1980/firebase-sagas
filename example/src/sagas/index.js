import { all } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { createAuthSaga } from 'firebase-sagas';
import todoSagas from './todoSagas';
import firebaseSagas from './firebaseSagas';

const authSaga = createAuthSaga(firebaseSagas, {
  signInMethods: [
    'signInWithEmailAndPassword',
  ],
  // signInOptions: {
  //   google: { scope: 'test' },
  // },
  onSignInSuccess: push('/Todo'),
  onSignOutSuccess: push('/'),
});

export default function* rootSaga() {
  yield all([
    authSaga(),
    todoSagas(),
  ]);
}
