export default function fetchWithHttpErr() {
  return fetch(...arguments)
    .then((res) => Promise.all([res.status, res.json()]))
    .then(([status, body]) => {
      if (status < 200 || status > 299) {
        throw new Error(body.message);
      }
      return { status, body };
    });
}

export const getAuthHeader = (token) => `Bearer ${token}`;
