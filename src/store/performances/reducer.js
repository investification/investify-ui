import { TYPES } from './actions';

export const initialState = {};

export default function performancesReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.ADD_COMPANIES_INFO:
    case TYPES.ADD_PERFORMANCES_INFO: {
      return mergeObjectOnEachKey(state, action.performances);
    }
    default: {
      return state;
    }
  }
}

function mergeObjectOnEachKey(state, extraState) {
  Object.keys(extraState).forEach((k) => {
    if (!state[k]) {
      state[k] = extraState[k];
      return;
    }
    state[k] = Object.assign({}, state[k], extraState[k]);
  });
  return state;
}
