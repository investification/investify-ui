import { useGlobalStore } from '../store';
import bindActions from '../store/bindActions';
import portfolioReducer from '../store/portfolios';

export default function usePortfolios() {
  const { state, dispatch } = useGlobalStore();
  const { portfolios } = state;
  return { portfolios, ...bindActions(portfolioReducer.actions, dispatch) };
}
