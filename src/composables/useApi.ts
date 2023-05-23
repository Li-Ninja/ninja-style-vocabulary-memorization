import axios, {
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
  HttpStatusCode,
} from 'axios';
import { Dialog } from 'quasar';
import { Router } from 'vue-router';
import { useLocalStorage } from '@/utils/localStorage.util';
import { MenuEnum } from '@/enums/common.enum';
import { LocalAxiosRequestConfig } from '@/types/auth';
import { ApiResponseData } from '@/types/api';
import { useSocketIo } from './useSocketIo';

const { getToken } = useLocalStorage();

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

export function prepareApi(router?: Router) {
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
          const socketIo = useSocketIo();

          if (socketIo) {
            socketIo.disconnect();
          }

          Dialog.create({
            title: 'Logout',
            message: 'please re-login',
            persistent: true,
          }).onOk(() => {
            if (!router || router.currentRoute.value.name === MenuEnum.Login) {
              return err.response as ApiResponse<D>;
            }

            return void router.push({ name: MenuEnum.Login });
          });
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
          const socketIo = useSocketIo();

          if (socketIo) {
            socketIo.disconnect();
          }

          Dialog.create({
            title: 'Logout',
            message: 'please re-login',
            persistent: true,
          }).onOk(() => {
            if (!router || router.currentRoute.value.name === MenuEnum.Login) {
              return err.response as ApiResponse<D>;
            }

            // 超過一份鐘後，這個沒有效果
            return void router.push({ name: MenuEnum.Login });
          });
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
