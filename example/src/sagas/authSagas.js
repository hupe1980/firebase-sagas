import { call, put, fork, all, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import firebaseSagas from './firebaseSagas';
import { types, authFailure, authChanged } from '../actions/authActions';

function* signInWithEmailAndPasswordSaga(action) {
  try {
    const { email, password } = action.payload;
    yield call(firebaseSagas.auth.signInWithEmailAndPassword, email, password);
  } catch (error) {
    yield put(authFailure(error));
  }
}

function* signOutSaga() {
  try {
    yield call(firebaseSagas.auth.signOut);
  } catch (error) {
    yield put(authFailure(error));
  }
}

function* authChangedSaga(action) {
  const user = action.payload;
  if (user) {
    yield put(push('/Todo'));
  } else {
    yield put(push('/'));
  }
}

function* syncUserSaga() {
  yield firebaseSagas.auth.syncUser(authChanged);
}

export default function* authRootSaga() {
  yield fork(syncUserSaga);
  yield all([
    takeEvery(types.SIGNIN_WITH_EMAIL_AND_PASSWORD, signInWithEmailAndPasswordSaga),
    takeEvery(types.SIGNOUT, signOutSaga),
    takeEvery(types.AUTH_CHANGED, authChangedSaga),
  ]);
}
