<script setup lang="ts">
import { HttpStatusCode } from 'axios';
import { Notify } from 'quasar';
import { ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { bootSocketIo } from '@/composables/useSocketIo';
import { useAuthApi } from '@/apis/auth.api';
import { useLocalStorage } from '@/utils/localStorage.util';
import { LoginPost } from '@/types/auth';
import { MenuEnum } from '@/enums/common.enum';

const router = useRouter();
const loginPostData: Ref<LoginPost> = ref({
  account: '',
  password: '',
});

async function login() {
  const res = await useAuthApi().getLoginToken(loginPostData.value);

  if (res?.status === HttpStatusCode.Ok) {
    if (res?.data) {
      useLocalStorage().setToken(res.data.data.token);
      bootSocketIo(process.env.API_DOMAIN);
      router.push({ name: MenuEnum.Home });
    }
  } else {
    Notify.create({
      message: res?.data?.message,
      color: 'primary',
    });
  }
}

</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <suspense>
      <q-page-container>
        here is login
        <q-input v-model="loginPostData.account" />
        <q-input v-model="loginPostData.password" />
        <q-btn @click="login">
          Login
        </q-btn>
      </q-page-container>
    </suspense>
  </q-layout>
</template>
