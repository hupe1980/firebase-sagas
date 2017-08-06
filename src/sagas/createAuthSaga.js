import { call, all, fork, put, takeEvery } from 'redux-saga/effects';
import { has } from 'lodash';
import types, { authActions } from '../actions';
import { signInMethods } from '../constants';

const createSignInWithProviderSaga = (firebaseSagas, method, scopes, customParameters) => function* signInWithProviderSaga() {
  try {
    yield call(firebaseSagas.auth[method], scopes, customParameters);
  } catch (error) {
    yield put(authActions.authFailure(error));
  }
};

const createSignInSagas = (firebaseSagas, options) => options.signInMethods.map((method) => {
  switch (method.type) {
    case signInMethods.ANONYMOUSLY:
      return {
        type: types.SIGNIN_ANONYMOUSLY,
        saga: function* signInAnonymously() {
          try {
            yield call(firebaseSagas.auth.signInAnonymously);
          } catch (error) {
            yield put(authActions.authFailure(error));
          }
        },
      };

    case signInMethods.EMAIL_AND_PASSWORD:
      return {
        type: types.SIGNIN_WITH_EMAIL_AND_PASSWORD,
        saga: function* signInWithEmailAndPasswordSaga(action) {
          try {
            const { email, password } = action.payload;
            yield call(firebaseSagas.auth.signInWithEmailAndPassword, email, password);
          } catch (error) {
            yield put(authActions.authFailure(error));
          }
        },
      };

    case signInMethods.GOOGLE:
    case signInMethods.FACEBOOK:
    case signInMethods.TWITTER:
    case signInMethods.GITHUB:
      return {
        type: types.SIGNIN_WITH_GOOGLE,
        saga: createSignInWithProviderSaga(firebaseSagas, method.type, method.scopes, method.customParameters),
      };

    default: {
      throw new Error('Unknown signInMethod!');
    }
  }
});

const createSignOutSaga = firebaseSagas => function* signOutSaga() {
  try {
    yield call(firebaseSagas.auth.signOut);
  } catch (error) {
    yield put(authActions.authFailure(error));
  }
};

const createAuthChangedSaga = options => function* authChangedSaga(action) {
  const user = action.payload;
  if (user && has(options, 'onSignInSuccess')) {
    yield options.onSignInSuccess(user);
  } else if (has(options, 'onSignOutSuccess')) {
    yield options.onSignOutSuccess();
  }
};

const createSyncUserSaga = firebaseSagas => function* syncUserSaga() {
  yield firebaseSagas.auth.syncUser(authActions.authChanged);
};

/**
 * Creates a AuthSaga
 * @function
 * @param {FirebaseSagas} FirebaseSagas
 * @param {object} options
 * @return {generator} authSaga
 * @example
 * import { createAuthSaga } from 'firebase-sagas';
 *
 * ...
 *
 * const authSaga = createAuthSaga(firebaseSagas, {
 *  signInMethods: [
 *    { type: 'signInWithEmailAndPassword' },
 *    { type: 'signInWithGoogle' },
 *   ],
 *  onSignInSuccess: function* onSignInSuccess() {
 *    yield put(push('/Todo'));
 *  },
 *  onSignOutSuccess: function* onSignOutSuccess() {
 *    yield put(push('/'));
 *  },
 * });
 */
const createAuthSaga = (firebaseSagas, options) => function* authSaga() {
  yield put(authActions.authInit(options));

  const syncUserSaga = createSyncUserSaga(firebaseSagas);
  yield fork(syncUserSaga);

  const signInSagas = createSignInSagas(firebaseSagas, options);
  const sagas = signInSagas.map(signInSaga => takeEvery(signInSaga.type, signInSaga.saga));

  const signOutSaga = createSignOutSaga(firebaseSagas);
  sagas.push(takeEvery(types.SIGNOUT, signOutSaga));
  const authChangedSaga = createAuthChangedSaga(options);
  sagas.push(takeEvery(types.AUTH_CHANGED, authChangedSaga));

  yield all(sagas);
};

export default createAuthSaga;
