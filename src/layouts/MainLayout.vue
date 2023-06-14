<script setup lang="ts">
import { Dialog } from 'quasar';
import { MenuEnum } from 'src/enums/common.enum';
import { useRouter } from 'vue-router';
import { useI18n } from '@/composables/useI18n';
import {
  bootSocketIo,
  useSocketIo,
} from '@/composables/useSocketIo';
import { useLocalStorage } from '@/utils/localStorage.util';

/** base */
const socketIo = useSocketIo();
const { t } = useI18n();

/** check socket */
if (!socketIo) {
  bootSocketIo(process.env.API_DOMAIN);
}

const router = useRouter();

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
    name: t('MenuEnum.ReviewLog'),
    icon: 'mdi-file-search',
    to: {
      name: MenuEnum.ReviewLog,
    },
  },
];

function logout() {
  Dialog.create({
    title: 'Logout',
    message: 'Are you sure you want to logout?',
    cancel: true,
  }).onOk(() => {
    useLocalStorage().clearToken();

    if (socketIo) {
      socketIo.disconnect();
    }

    router.push({ name: MenuEnum.Login });
  });
}

</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated>
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
        <q-tab
          class="col"
          icon="mdi-logout"
          @click="logout"
          :label="$t('logout')"
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
