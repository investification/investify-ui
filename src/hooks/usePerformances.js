import { useGlobalStore } from '../store';
import bindActions from '../store/bindActions';
import performanceReducer from '../store/performances';

export default function usePerformances() {
  const { state, dispatch } = useGlobalStore();
  const { performances } = state;
  return { performances, ...bindActions(performanceReducer.actions, dispatch) };
}
