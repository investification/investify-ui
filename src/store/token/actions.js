export const TYPES = {
  ADD: 'TOKEN_ADD',
  REMOVE: 'TOKEN_REMOVE',
};

export function addToken(token) {
  localStorage.setItem('token', token);
  return {
    type: TYPES.ADD,
    token,
  };
}

export function removeToken() {
  localStorage.removeItem('token');
  return {
    type: TYPES.REMOVE,
  };
}
