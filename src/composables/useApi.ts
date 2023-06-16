import axios, {
  AxiosError, AxiosRequestConfig, AxiosResponse, HttpStatusCode,
} from 'axios';
import { Dialog } from 'quasar';
import { Router } from 'vue-router';
import { useSocketIo } from './useSocketIo';
import { useI18n } from '@/composables/useI18n';
import { MenuEnum } from '@/enums/common.enum';
import { ApiResponseData } from '@/types/api';
import { LocalAxiosRequestConfig } from '@/types/auth';
import { useLocalStorage } from '@/utils/localStorage.util';

const { getToken, clearToken } = useLocalStorage();
const { t } = useI18n();

type ApiResponse<D> = AxiosResponse<ApiResponseData<D>, any> | undefined;
type AsyncApiResponse<D> = Promise<ApiResponse<D>>;

function requestHandler(request: AxiosRequestConfig) {
  const token = getToken();

  if (token) {
    (request.headers as LocalAxiosRequestConfig['headers']) = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
}

function reLoginService<D>(router: Router | undefined, err: AxiosError<D>) {
  const socketIo = useSocketIo();

  if (socketIo) {
    socketIo.disconnect();
  }

  clearToken();

  Dialog.create({
    title: t('logout'),
    message: t('loginAgain'),
    persistent: true,
  }).onOk(() => {
    if (!router || router.currentRoute.value.name === MenuEnum.Login) {
      return err.response as ApiResponse<D>;
    }

    return void router.push({ name: MenuEnum.Login });
  });
}

function prepareApi(router?: Router) {
  const api = axios.create({
    // can last connecting 1 min
    timeout: 60000,
    baseURL: process.env.API_DOMAIN,
  });

  function getApi<D, P = any>(url: string, paramsData?: P)
    : AsyncApiResponse<D> {
    return api.get<ApiResponseData<D>>(url, { params: paramsData })
      .then(res => res)
      .catch((err: AxiosError<D>) => {
        if (err.response?.status === HttpStatusCode.Forbidden) {
          reLoginService(router, err);
        }

        if (err.code === 'ERR_NETWORK') {
          reLoginService(router, err);
        }

        return err.response as ApiResponse<D>;
      });
  }

  function postApi<D, P = any>(url: string, postData: P)
    : AsyncApiResponse<D> {
    return api.post<ApiResponseData<D>>(url, postData)
      .then(res => res)
      .catch((err: AxiosError<D>) => {
        if (err.response?.status === HttpStatusCode.Forbidden) {
          reLoginService(router, err);
        }

        if (err.code === 'ERR_NETWORK') {
          reLoginService(router, err);
        }

        return err.response as ApiResponse<D>;
      });
  }

  api.interceptors.request.use(requestHandler);

  return {
    getApi,
    postApi,
  };
}

let instance: ReturnType<typeof prepareApi>;

export function bootApi(router: Router) {
  if (!instance) {
    instance ??= prepareApi(router);
  }

  return instance;
}

export function useApi() {
  return instance;
}
