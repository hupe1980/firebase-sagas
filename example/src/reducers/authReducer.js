import { types } from '../actions/authActions';

const INITIAL_STATE = {
  loading: false,
  loggedIn: false,
  user: null,
  error: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.LOGIN_USER.REQUEST:
    case types.LOGOUT_USER.REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.LOGIN_USER.SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
      };
    case types.LOGOUT_USER.SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: false,
      };
    case types.LOGIN_USER.FAILURE:
    case types.LOGOUT_USER.FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.SYNC_USER.TRIGGER:
      return {
        ...state,
        loggedIn: action.payload != null,
        user: action.payload,
      };
    default:
      return state;
  }
}
