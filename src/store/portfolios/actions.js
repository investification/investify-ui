export const TYPES = {
  ADD: 'PORTFOLIO_ADD',
};

export function addPortfolio(portfolio, toTopOfPile) {
  return {
    type: TYPES.ADD,
    portfolio,
    toTopOfPile,
  };
}
