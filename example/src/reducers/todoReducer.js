import { types } from '../actions/todoActions';

const INITIAL_STATE = {
  list: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SYNC_TODOS:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
}
