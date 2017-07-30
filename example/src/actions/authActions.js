import { createAction } from 'redux-actions';

export const types = {
  SIGNIN_WITH_EMAIL_AND_PASSWORD: 'SIGNIN_WITH_EMAIL_AND_PASSWORD',
  SIGNOUT: 'SIGNOUT',
  AUTH_FAILURE: 'AUTH_FAILURE',
  AUTH_CHANGED: 'AUTH_CHANGED',
};

export const signInWithEmailAndPassword = createAction(types.SIGNIN_WITH_EMAIL_AND_PASSWORD);
export const signOut = createAction(types.SIGNOUT);
export const authFailure = createAction(types.AUTH_FAILURE);
export const authChanged = createAction(types.AUTH_CHANGED);
