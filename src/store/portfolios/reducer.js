import { TYPES } from './actions';

export const initialState = {};

export default function portfoliosReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.ADD: {
      return Object.assign({}, state, {
        [action.portfolio.id]: action.portfolio,
      });
    }
    default: {
      return state;
    }
  }
}
