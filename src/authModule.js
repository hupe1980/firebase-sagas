import { eventChannel } from 'redux-saga';
import { call } from 'redux-saga/effects';

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
 * Signs out the current user.
 */
function* signOut() {
  const auth = this.app.auth();
  yield call([auth, auth.signOut]);
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
  createOnAuthStateChangedChannel,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  currentUser,
};
