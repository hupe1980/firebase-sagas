/**
 * Constants.
 * @module constants
 */
export const ACTION_PREFIX = '@@firebase-sagas/';

export const eventTypes = {
  VALUE: 'value',
  CHILD_ADDED: 'child_added',
  CHILD_REMOVED: 'child_removed',
  CHILD_CHANGED: 'child_changed',
  CHILD_MOVED: 'child_moved',
};

export const signInMethods = {
  EMAIL_AND_PASSWORD: 'signInWithEmailAndPassword',
  ANONYMOUSLY: 'signInAnonymously',
  GOOGLE: 'signInWithGoogle',
  FACEBOOK: 'signInWithFacebook',
  TWITTER: 'signInWithTwitter',
  GITHUB: 'signInWithGithub',
};

export default {
  ACTION_PREFIX,
  eventTypes,
  signInMethods,
};
