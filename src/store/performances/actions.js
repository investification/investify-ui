export const TYPES = {
  ADD_COMPANIES_INFO: 'PERFORMANCE_ADD_COMPANIES_INFO',
  ADD_PERFORMANCES_INFO: 'PERFORMANCE_ADD_PERFORMANCE_INFO',
};

export function addCompaniesInfo(companies) {
  const performances = companies.reduce((acc, v) => {
    acc[v.symbol] = v;
    return acc;
  }, {});
  return {
    type: TYPES.ADD_COMPANIES_INFO,
    performances,
  };
}

export function addPerformancesInfo(performances) {
  return {
    type: TYPES.ADD_PERFORMANCES_INFO,
    performances,
  };
}
