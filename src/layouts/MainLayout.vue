<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useI18n } from '@/composables/useI18n';
import {
  bootSocketIo,
  useSocketIo,
} from '@/composables/useSocketIo';
import { MenuEnum } from '@/enums/common.enum';
import { SocketEventEnum } from '@/enums/socket.enum';
import { useLocalStorage } from '@/utils/localStorage.util';

/** base */
const { t } = useI18n();
const socketIo = useSocketIo();
const router = useRouter();
const { clearToken } = useLocalStorage();

/** check socket */
if (!socketIo) {
  const event = await bootSocketIo(process.env.API_DOMAIN);

  if (event === SocketEventEnum.ConnectError) {
    clearToken();
    router.push({ name: MenuEnum.Login });
  }
}

const tabs = [
  {
    name: t('MenuEnum.Home'),
    icon: 'mdi-home',
    to: {
      name: MenuEnum.Home,
    },
  },
  {
    name: t('MenuEnum.Word'),
    icon: 'mdi-sticker-text',
    to: {
      name: MenuEnum.Word,
    },
  },
  {
    name: '',
    icon: 'mdi-plus-circle',
    to: {
      name: MenuEnum.Review,
    },
  },
  {
    name: t('MenuEnum.Chart'),
    icon: 'mdi-chart-line',
    to: {
      name: MenuEnum.Chart,
    },
  },
  {
    name: t('MenuEnum.Setting'),
    icon: 'mdi-menu',
    to: {
      name: MenuEnum.Setting,
    },
  },
];

</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="q-pa-lg fullscreen">
      <router-view />
    </q-page-container>

    <q-footer class="z-max">
      <q-tabs
        dense
        indicator-color="transparent"
        active-color="white"
        class="bg-primary text-grey-5 text-capitalize shadow-2 row"
      >
        <q-route-tab
          class="col"
          v-for="tab in tabs"
          :key="tab.name"
          :icon="tab.icon"
          :to="tab.to"
          :label="tab.name"
          :class="tab.name === '' ? 'iconSize' : ''"
          exact
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<style lang="scss">
.iconSize [class ~= "q-tab__icon"] {
  font-size: 48px;
}

</style>
