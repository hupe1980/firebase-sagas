/**
 * A module for firebaseSagas.auth
 * @module auth
 */
import firebase from 'firebase';
import { eventChannel } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';

/**
 * Creates a new user account associated with the specified email address and password.
 *
 * @param {string} email
 * @param {string} password
 * @returns {firebase.User} user
 */
function* createUserWithEmailAndPassword(email, password) {
  const auth = this.app.auth();
  return yield call([auth, auth.createUserWithEmailAndPassword], email, password);
}

/**
 * Signs in using an email and password.
 *
 * @param {string} email
 * @param {string} password
 * @returns {firebase.User} user
 */
function* signInWithEmailAndPassword(email, password) {
  const auth = this.app.auth();
  return yield call([auth, auth.signInWithEmailAndPassword], email, password);
}

/**
 * Signs in as an anonymous user.
 *
 * @returns {firebase.User} user
 */
function* signInAnonymously() {
  const auth = this.app.auth();
  return yield call([auth, auth.signInAnonymously]);
}

/**
 * Signs in using a custom token.
 *
 * @param {string} token The custom token to sign in with.
 * @returns {firebase.User} user
 */
function* signInWithCustomToken(token) {
  const auth = this.app.auth();
  return yield call([auth, auth.signInWithCustomToken], token);
}

function* signInWithPopup(provider, scopes, customParameters) {
  const auth = this.app.auth();
  if (scopes) {
    scopes.map(scope => provider.addScope(scope));
  }
  if (customParameters) {
    provider.setCustomParameters(customParameters);
  }
  const { user } = yield call([auth, auth.signInWithPopup], provider);
  return user;
}

/**
 * Signs in using GoogleAuthProvider.
 *
 * @param {array} scopes Google OAuth scopes
 * @param {object} customParameters The custom OAuth parameters to pass in the OAuth request
 * @returns {firebase.User} user
 */
function* signInWithGoogle(scopes, customParameters) {
  const provider = new firebase.auth.GoogleAuthProvider();
  return yield this.auth.signInWithPopup(provider, scopes, customParameters);
}

/**
 * Signs in using FacebookAuthProvider.
 *
 * @param {array} scopes Facebook OAuth scopes
 * @param {object} customParameters The custom OAuth parameters to pass in the OAuth request
 * @returns {firebase.User} user
 */
function* signInWithFacebook(scopes, customParameters) {
  const provider = new firebase.auth.FacebookAuthProvider();
  return yield this.auth.signInWithPopup(provider, scopes, customParameters);
}

/**
 * Signs in using TwitterAuthProvider.
 *
 * @param {array} scopes Twitter OAuth scopes
 * @param {object} customParameters The custom OAuth parameters to pass in the OAuth request
 * @returns {firebase.User} user
 */
function* signInWithTwitter(scopes, customParameters) {
  const provider = new firebase.auth.TwitterAuthProvider();
  return yield this.auth.signInWithPopup(provider, scopes, customParameters);
}

/**
 * Signs in using GithubAuthProvider.
 *
 * @param {array} scopes Github OAuth scopes
 * @param {object} customParameters The custom OAuth parameters to pass in the OAuth request
 * @returns {firebase.User} user
 */
function* signInWithGithub(scopes, customParameters) {
  const provider = new firebase.auth.GithubAuthProvider();
  return yield this.auth.signInWithPopup(provider, scopes, customParameters);
}

/**
 * Signs out the current user.
 */
function* signOut() {
  const auth = this.app.auth();
  yield call([auth, auth.signOut]);
}

/**
 * @param {function} actionCreator
 */
function* syncUser(actionCreator) {
  const channel = yield call(this.auth.createOnAuthStateChangedChannel);
  while (true) {
    const { user } = yield take(channel);
    yield put(actionCreator(user));
  }
}

/**
 * Creates channel that will subscribe to changes
 * to the user's sign-in state.
 *
 * @returns {eventChannel} onAuthStateChangedChannel
 */
function createOnAuthStateChangedChannel() {
  const auth = this.app.auth();
  const channel = eventChannel(emit =>
    auth.onAuthStateChanged(user => emit({ user })),
  );
  return channel;
}

/**
 * Returns the currently signed-in user (or null).
 *
 * @returns {firebase.User} user
 */
function currentUser() {
  return this.app.auth().currentUser;
}

export default {
  syncUser,
  createOnAuthStateChangedChannel,
  signOut,
  signInWithEmailAndPassword,
  signInAnonymously,
  signInWithCustomToken,
  signInWithPopup,
  signInWithGoogle,
  signInWithFacebook,
  signInWithTwitter,
  signInWithGithub,
  createUserWithEmailAndPassword,
  currentUser,
};
