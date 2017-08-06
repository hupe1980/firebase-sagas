import types from '../actions';

const INITIAL_STATE = {
  options: {},
  loading: false,
  authenticated: false,
  error: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SIGNIN_WITH_EMAIL_AND_PASSWORD:
    case types.SIGNIN_ANONYMOUSLY:
    case types.SIGNIN_WITH_GOOGLE:
    case types.SIGNIN_WITH_FACEBOOK:
    case types.SIGNIN_WITH_TWITTER:
    case types.SIGNIN_WITH_GITHUB:
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
        loading: false,
        authenticated: action.payload != null,
      };
    case types.AUTH_INIT:
      return {
        ...state,
        options: action.payload,
      };
    default:
      return state;
  }
}
