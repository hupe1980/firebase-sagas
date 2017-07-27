import { createAction } from 'redux-actions';

export const types = {
  LOGIN_USER: {
    REQUEST: 'LOGIN_USER.REQUEST',
    SUCCESS: 'LOGIN_USER.SUCCESS',
    FAILURE: 'LOGIN_USER.FAILURE',
  },
  LOGOUT_USER: {
    REQUEST: 'LOGOUT_USER.REQUEST',
    SUCCESS: 'LOGOUT_USER.SUCCESS',
    FAILURE: 'LOGOUT_USER.FAILURE',
  },
  SYNC_USER: {
    TRIGGER: 'SYNC_USER.TRIGGER',
  },
};

// Log in action creators:
export const loginUserRequest = createAction(types.LOGIN_USER.REQUEST);
export const loginUserSuccess = createAction(types.LOGIN_USER.SUCCESS);
export const loginUserFailure = createAction(types.LOGIN_USER.FAILURE);

// Log out action creators:
export const logoutUserRequest = createAction(types.LOGOUT_USER.REQUEST);
export const logoutUserSuccess = createAction(types.LOGOUT_USER.SUCCESS);
export const logoutUserFailure = createAction(types.LOGOUT_USER.FAILURE);

// Sync action creator:
export const syncUserTrigger = createAction(types.SYNC_USER.TRIGGER);
