import { call, put, fork, take, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import firebaseSagas from './firebaseSagas';
import {
  types,
  loginUserSuccess,
  loginUserFailure,
  logoutUserSuccess,
  logoutUserFailure,
  syncUserTrigger,
} from '../actions/authActions';

function* loginUserSaga(action) {
  try {
    const { email, password } = action.payload;
    const user = yield call(firebaseSagas.auth.signInWithEmailAndPassword, email, password);
    yield put(loginUserSuccess(user));
    yield put(push('/'));
  } catch (error) {
    yield put(loginUserFailure(error));
  }
}

function* logoutUserSaga() {
  try {
    yield call(firebaseSagas.auth.signOut);
    yield put(logoutUserSuccess());
    yield put(push('/Login'));
  } catch (error) {
    yield put(logoutUserFailure(error));
  }
}

function* syncUserSaga() {
  const onAuthStateChangedChannel = yield call(firebaseSagas.auth.createOnAuthStateChangedChannel);

  while (true) {
    const { user } = yield take(onAuthStateChangedChannel);
    if (user) {
      yield put(syncUserTrigger(user));
    } else {
      yield put(syncUserTrigger(null));
    }
  }
}

export default function* authRootSaga() {
  yield fork(syncUserSaga);
  yield takeEvery(types.LOGIN_USER.REQUEST, loginUserSaga);
  yield takeEvery(types.LOGOUT_USER.REQUEST, logoutUserSaga);
}
