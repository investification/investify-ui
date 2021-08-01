import jwtDecode from 'jwt-decode';

import { TYPES } from './actions';

let tokenString = localStorage.getItem('token');

if (tokenString) {
  try {
    const tokenJson = jwtDecode(tokenString);
    if (Date.now() / 1000 > tokenJson.exp) {
      tokenString = '';
    }
  } catch (e) {
    localStorage.removeItem('token');
  }
}

export const initialState = tokenString;

export default function tokenReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.ADD: {
      return action.token;
    }
    default: {
      return state;
    }
  }
}
