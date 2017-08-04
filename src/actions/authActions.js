import { createAction } from 'redux-actions';
import * as types from './types';

export const createUserWithEmailAndPassword = createAction(types.CREATE_USER_WITH_EMAIL_AND_PASSWORD);

export const signInWithEmailAndPassword = createAction(types.SIGNIN_WITH_EMAIL_AND_PASSWORD);
export const signInAnonymously = createAction(types.SIGNIN_ANONYMOUSLY);
export const signInWithCustomToken = createAction(types.SIGNIN_WITH_CUSTOM_TOKEN);

export const signOut = createAction(types.SIGNOUT);

export const authFailure = createAction(types.AUTH_FAILURE);
export const authChanged = createAction(types.AUTH_CHANGED);

export default {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  signInWithCustomToken,
  signOut,
  authFailure,
  authChanged,
};
