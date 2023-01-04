import axios, { } from 'axios';

export function prepareApi() {
  const api = axios.create({
    // can last connecting 1 min
    timeout: 60000,
    baseURL: process.env.API_DOMAIN
  });

  function getApi<D = any>(url: string, postData = {}) {
    return api.get<D>(url, postData).then(res => res.data);
  }

  function postApi<D = any>(url: string, postData = {}) {
    return api.post<D>(url, postData).then(res => res.data);
  }

  return {
    getApi,
    postApi
  };
}

let instance: ReturnType<typeof prepareApi> | undefined;

export function useApi() {
  instance ??= prepareApi();

  return instance;
}
