export function useLocalStorage() {
  function getToken() {
    return localStorage.getItem('accessToken');
  }

  function setToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  function clearToken() {
    localStorage.setItem('accessToken', '');
  }

  return {
    getToken,
    setToken,
    clearToken,
  };
}
