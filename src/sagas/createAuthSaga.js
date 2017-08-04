import { call, all, fork, put, takeEvery } from 'redux-saga/effects';
import { isFunction } from 'lodash';
import types, { authActions } from '../actions';

const createSignInWithEmailAndPasswordSaga = firebaseSagas => function* signInWithEmailAndPasswordSaga(action) {
  try {
    const { email, password } = action.payload;
    yield call(firebaseSagas.auth.signInWithEmailAndPassword, email, password);
  } catch (error) {
    yield put(authActions.authFailure(error));
  }
};

const createSignInAnonymously = firebaseSagas => function* signInAnonymously() {
  try {
    yield call(firebaseSagas.auth.signInAnonymously);
  } catch (error) {
    yield put(authActions.authFailure(error));
  }
};

const createSignInWithCustomToken = firebaseSagas => function* signInWithCustomToken(token) {
  try {
    yield call(firebaseSagas.auth.signInWithCustomToken, token);
  } catch (error) {
    yield put(authActions.authFailure(error));
  }
};

const createSignOutSaga = firebaseSagas => function* signOutSaga() {
  try {
    yield call(firebaseSagas.auth.signOut);
  } catch (error) {
    yield put(authActions.authFailure(error));
  }
};

const createAuthChangedSaga = options => function* authChangedSaga(action) {
  const user = action.payload;
  const { onSignInSuccess, onSignOutSuccess } = options;
  if (user && onSignInSuccess) {
    if (isFunction(onSignInSuccess)) {
      yield put(onSignInSuccess(user)); // ActionCreator
    } else {
      yield put(onSignInSuccess); // Action
    }
  } else if (onSignOutSuccess) {
    if (isFunction(onSignOutSuccess)) {
      yield put(onSignOutSuccess(null)); // ActionCreator
    } else {
      yield put(onSignOutSuccess); // Action
    }
  }
};

const createSyncUserSaga = firebaseSagas => function* syncUserSaga() {
  yield firebaseSagas.auth.syncUser(authActions.authChanged);
};

/**
 * Creates a AuthSaga
 * @function
 * @return {generator} authSaga
 * @example
 * import { createAuthSaga } from 'firebase-sagas';
 *
 * ...
 *
 * const authSaga = createAuthSaga(firebaseSagas, {
 *   signInMethods: [
 *     'signInWithEmailAndPassword',
 *   ],
 *   onSignInSuccess: push('/Todo'), //react-router-redux
 *   onSignOutSuccess: push('/'),
 * });
 */
const createAuthSaga = (firebaseSagas, options) => function* authSaga() {
  const signOutSaga = createSignOutSaga(firebaseSagas);
  const authChangedSaga = createAuthChangedSaga(options);
  const syncUserSaga = createSyncUserSaga(firebaseSagas);
  const signInWithEmailAndPasswordSaga = createSignInWithEmailAndPasswordSaga(firebaseSagas);
  const signInAnonymously = createSignInAnonymously(firebaseSagas);
  const signInWithCustomToken = createSignInWithCustomToken(firebaseSagas);

  yield fork(syncUserSaga);
  yield all([
    takeEvery(types.SIGNIN_WITH_EMAIL_AND_PASSWORD, signInWithEmailAndPasswordSaga),
    takeEvery(types.SIGNIN_ANONYMOUSLY, signInAnonymously),
    takeEvery(types.SIGNIN_WITH_CUSTOM_TOKEN, signInWithCustomToken),
    takeEvery(types.SIGNOUT, signOutSaga),
    takeEvery(types.AUTH_CHANGED, authChangedSaga),
  ]);
};

export default createAuthSaga;
