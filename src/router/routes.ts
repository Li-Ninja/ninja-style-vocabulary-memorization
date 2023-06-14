import { MenuEnum } from 'src/enums/common.enum';
import { convertFromCamelToKebab } from 'src/utils/common.util';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: MenuEnum.Home,
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
        path: convertFromCamelToKebab(MenuEnum.ReviewLog),
        name: MenuEnum.ReviewLog,
        component: () => import('pages/review/ReviewLog.vue'),
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
