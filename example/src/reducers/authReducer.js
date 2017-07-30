import { types } from '../actions/authActions';

const INITIAL_STATE = {
  loading: false,
  loggedIn: false,
  user: null,
  error: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SIGNIN_WITH_EMAIL_AND_PASSWORD:
    case types.SIGNOUT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.AUTH_CHANGED:
      return {
        ...state,
        loggedIn: action.payload != null,
        user: action.payload,
      };
    default:
      return state;
  }
}
