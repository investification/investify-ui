import { useGlobalStore } from '../store';
import bindActions from '../store/bindActions';
import tokenReducer from '../store/token';

export default function useToken() {
  const { state, dispatch } = useGlobalStore();
  const { token } = state;
  return { token, ...bindActions(tokenReducer.actions, dispatch) };
}
