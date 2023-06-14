import {
  describe, expect, it,
} from '@jest/globals';
import axios, { HttpStatusCode } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  bootApi, useApi,
} from '@/composables/useApi';

const mock = new MockAdapter(axios);

const router = {
  currentRoute: {
    value: {
      name: 'Login',
    },
  },
  push: jest.fn(),
};

jest.mock('vue-router', () => ({
  createRouter: jest.fn().mockReturnValue(router),
  createMemoryHistory: jest.fn(),
}));

jest.mock('quasar', () => ({
  Dialog: {
    create: jest.fn().mockReturnValue({
      onOk: jest.fn(),
    }),
  },
}));

describe('useApi', () => {
  afterEach(() => {
    mock.reset();
  });

  it('boot api not undefined', () => {
    expect(typeof bootApi(undefined as any)).toBe('object');
  });

  it('should get data with getApi', async () => {
    const data = { success: true };

    mock.onGet('/test').reply(200, data);
    const api = useApi();
    const response = await api?.getApi('/test');

    expect(response?.data).toEqual(data);
  });

  it('should post data with postApi', async () => {
    const reqData = { name: 'John Doe' };
    const resData = { success: true };

    mock.onPost('/test', reqData).reply(200, resData);
    const api = useApi();
    const response = await api?.postApi('/test', reqData);

    expect(response?.data).toEqual(resData);
  });

  it('should handle forbidden request', async () => {
    const resData = { code: HttpStatusCode.Forbidden };

    mock.onGet('/test').reply(HttpStatusCode.Forbidden, resData);
    const api = useApi();
    const response = await api?.getApi('/test');

    expect(response?.data).toEqual(resData);
    // Check if the router was redirected to the login page
    expect(router.currentRoute.value.name).toBe('Login');
  });

  it('should handle network error', async () => {
    mock.onGet('/test').networkError();
    const api = useApi();
    const response = await api?.getApi('/test');

    expect(response).toBeUndefined();
  });
});
