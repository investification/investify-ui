export const TYPES = {
  ADD: 'PORTFOLIO_ADD',
};

export function addPortfolio(portfolio) {
  return {
    type: TYPES.ADD,
    portfolio,
  };
}
