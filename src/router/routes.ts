import { MenuEnum } from 'src/enums/common.enum';
import { convertFromCamelToKebab } from 'src/utils/common.util';
import { RouteRecordRaw } from 'vue-router';
import {
  bootSocketIo, useSocketIo,
} from '@/composables/useSocketIo';
import { SocketEventEnum } from '@/enums/socket.enum';
import { useLocalStorage } from '@/utils/localStorage.util';

const { clearToken } = useLocalStorage();

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: MenuEnum.Home,
    beforeEnter: async (_to, _from, next) => {
      const socketIo = useSocketIo();

      if (!socketIo) {
        const event = await bootSocketIo(process.env.API_DOMAIN);

        if (event === SocketEventEnum.ConnectError) {
          clearToken();
          next({ name: MenuEnum.Login });
        }
      }

      next();
    },
    children: [
      {
        path: convertFromCamelToKebab(MenuEnum.Home),
        name: MenuEnum.Home,
        component: () => import('pages/Home.vue'),
      },
      {
        path: convertFromCamelToKebab(MenuEnum.Review),
        name: MenuEnum.Review,
        component: () => import('pages/Review.vue'),
      },
      {
        path: convertFromCamelToKebab(MenuEnum.Word),
        name: MenuEnum.Word,
        component: () => import('pages/word/Word.vue'),
        redirect: {
          name: MenuEnum.WordTable,
        },
        children: [
          {
            path: '',
            name: MenuEnum.WordTable,
            component: () => import('pages/word/WordTable.vue'),
          },
          {
            path: '',
            name: MenuEnum.WordAdd,
            component: () => import('pages/word/WordAdd.vue'),
          },
        ],
      },
      {
        path: convertFromCamelToKebab(MenuEnum.Chart),
        name: MenuEnum.Chart,
        component: () => import('pages/chart/Chart.vue'),
        redirect: {
          name: MenuEnum.ChartReviewLog,
        },
        children: [
          {
            path: '',
            name: MenuEnum.ChartReviewLog,
            component: () => import('pages/chart/ChartReviewLog.vue'),
          },
        ],
      },
      {
        path: convertFromCamelToKebab(MenuEnum.Setting),
        name: MenuEnum.Setting,
        component: () => import('pages/Setting.vue'),
        children: [
          {
            path: 'language',
            name: 'language',
            component: () => import('@/components/setting/Language.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    redirect: MenuEnum.Login,
    children: [
      {
        path: convertFromCamelToKebab(MenuEnum.Login),
        name: MenuEnum.Login,
        component: () => import('pages/Login.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
