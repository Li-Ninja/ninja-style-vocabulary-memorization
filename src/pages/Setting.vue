<script setup lang="ts">
import { Dialog } from 'quasar';
import { MenuEnum } from 'src/enums/common.enum';
import {
  shallowRef, watch,
} from 'vue';
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
const router = useRouter();
const routeName = shallowRef(router.currentRoute.value.name);

/** check route name */
watch(() => router.currentRoute.value.name, () => {
  routeName.value = router.currentRoute.value.name;
});

/** check socket */
if (!socketIo) {
  bootSocketIo(process.env.API_DOMAIN);
}

function logout() {
  Dialog.create({
    title: t('logout'),
    message: t('checkLogout'),
    focus: 'cancel',
    ok: {
      'text-color': 'secondary',
      flat: true,
    },
    cancel: {
      'text-color': 'primary',
      flat: true,
    },
  }).onOk(() => {
    useLocalStorage().clearToken();

    if (socketIo) {
      socketIo.disconnect();
    }

    router.push({ name: MenuEnum.Login });
  });
}

function goTo(name: string) {
  router.push({ name });
}

</script>

<template>
  <div>
    <template v-if="routeName === MenuEnum.Setting">
      <div class="text-h6 text-center q-mb-md">
        {{ $t('MenuEnum.Setting') }}
      </div>
      <q-list class="text-subtitle1 text-capitalize">
        <q-item
          clickable
          @click="goTo('language')"
        >
          <q-item-section>
            {{ $t('language') }}
          </q-item-section>
          <q-item-section side>
            <q-icon name="mdi-chevron-right" />
          </q-item-section>
        </q-item>
        <q-item
          clickable
          @click="logout()"
        >
          <q-item-section>
            {{ t('logout') }}
          </q-item-section>
        </q-item>
      </q-list>
    </template>
    <template v-else>
      <router-view />
    </template>
  </div>
</template>
