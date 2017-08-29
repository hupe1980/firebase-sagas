import types from '../actions';

const INITIAL_STATE = {
  auth: {},
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.AUTH_INIT:
      return {
        ...state,
        auth: action.payload,
      };
    default:
      return state;
  }
}
