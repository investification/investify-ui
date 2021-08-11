import { TYPES } from './actions';

export const initialState = {};

export default function portfoliosReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.ADD: {
      if (action.toTopOfPile) {
        return Object.assign(
          {},
          {
            [action.portfolio.id]: action.portfolio,
          },
          state,
        );
      }

      return Object.assign({}, state, {
        [action.portfolio.id]: action.portfolio,
      });
    }
    default: {
      return state;
    }
  }
}
