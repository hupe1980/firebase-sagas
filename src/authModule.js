import { eventChannel } from 'redux-saga';
import { call } from 'redux-saga/effects';

/**
 * Creates a new user account associated with the specified email address and password.
 *
 * @param email
 * @param password
 */
function* createUserWithEmailAndPassword(email, password) {
  const auth = this._firebase.auth();
  yield call([auth, auth.createUserWithEmailAndPassword], email, password);
}

/**
 * Signs in using an email and password.
 *
 * @param email
 * @param password
 * @returns user
 */
function* signInWithEmailAndPassword(email, password) {
  const auth = this._firebase.auth();
  return yield call([auth, auth.signInWithEmailAndPassword], email, password);
}

/**
 * Signs out the current user.
 */
function* signOut() {
  const auth = this._firebase.auth();
  yield call([auth, auth.signOut]);
}

/**
 * Creates channel that will subscribe to changes
 * to the user's sign-in state. 
 */
function createOnAuthStateChangedChannel() {
  const auth = this._firebase.auth();
  const channel = eventChannel(emit => {
    const onASC = auth.onAuthStateChanged(
      user => emit({ user }),
      error => emit({ error })
    );
    return onASC;
  });
  return channel;
}

/**
 * Returns the currently signed-in user (or null).
 *
 * @returns user
 */
function currentUser() {
  return this._firebase.auth().currentUser;
}

export default {
  createOnAuthStateChangedChannel,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  currentUser
};
