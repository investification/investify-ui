import portfoliosReducer from './portfolios';
import performancesReducer from './performances';
import tokenReducer from './token';

export const initialState = {
  portfolios: portfoliosReducer.initialState,
  performances: performancesReducer.initialState,
  token: tokenReducer.initialState,
};

export default function mainReducer(state, action) {
  const { portfolios, performances, token } = state;
  return {
    portfolios: portfoliosReducer.reducer(portfolios, action),
    performances: performancesReducer.reducer(performances, action),
    token: tokenReducer.reducer(token, action),
  };
}
