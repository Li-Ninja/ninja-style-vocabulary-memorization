<script setup lang="ts">
import { Dialog } from 'quasar';
import { MenuEnum } from 'src/enums/common.enum';
import { useRouter } from 'vue-router';
import {
  bootSocketIo, useSocketIo,
} from '@/composables/useSocketIo';
import { useLocalStorage } from '@/utils/localStorage.util';

/** base */
const socketIo = useSocketIo();

/** check socket */
if (!socketIo) {
  bootSocketIo(process.env.API_DOMAIN);
}

const router = useRouter();

const tabs = [
  {
    name: MenuEnum.Home,
    icon: 'mdi-home',
    to: {
      name: MenuEnum.Home,
    },
  },
  {
    name: MenuEnum.Word,
    icon: 'mdi-sticker-text',
    to: {
      name: MenuEnum.Word,
    },
  },
  {
    name: MenuEnum.Review,
    icon: 'mdi-file-search',
    to: {
      name: MenuEnum.Review,
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
    <q-header elevated>
      <q-tabs
        dense
        class="row items-center full-width "
      >
        <div class="col row">
          <q-route-tab
            class="col"
            v-for="tab in tabs"
            :key="tab.name"
            :icon="tab.icon"
            :to="tab.to"
            :label="tab.name"
            exact
          />
        </div>
        <div class="col-shrink">
          <q-btn
            @click="logout()"
            flat
            padding="md"
            icon="mdi-logout"
            color="white"
            label="Logout"
          />
        </div>
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
