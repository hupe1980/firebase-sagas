import { createAction } from 'redux-actions';
import * as types from './types';

export const createUserWithEmailAndPassword = createAction(types.CREATE_USER_WITH_EMAIL_AND_PASSWORD);

export const signInWithEmailAndPassword = createAction(types.SIGNIN_WITH_EMAIL_AND_PASSWORD);
export const signInAnonymously = createAction(types.SIGNIN_ANONYMOUSLY);
export const signInWithGoogle = createAction(types.SIGNIN_WITH_GOOGLE);
export const signInWithFacebook = createAction(types.SIGNIN_WITH_FACEBOOK);
export const signInWithTwitter = createAction(types.SIGNIN_WITH_TWITTER);
export const signInWithGithub = createAction(types.SIGNIN_WITH_GITHUB);

export const signOut = createAction(types.SIGNOUT);

export const authInit = createAction(types.AUTH_INIT);
export const authFailure = createAction(types.AUTH_FAILURE);
export const authChanged = createAction(types.AUTH_CHANGED);

export default {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  signInWithGoogle,
  signInWithFacebook,
  signInWithTwitter,
  signInWithGithub,
  signOut,
  authInit,
  authFailure,
  authChanged,
};
