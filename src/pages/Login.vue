<script setup lang="ts">
import { HttpStatusCode } from 'axios';
import { Notify } from 'quasar';
import {
  Ref, ref, shallowRef,
} from 'vue';
import { useRouter } from 'vue-router';
import { useAuthApi } from '@/apis/auth.api';
import { bootSocketIo } from '@/composables/useSocketIo';
import { required } from '@/constants/rule.constant';
import { MenuEnum } from '@/enums/common.enum';
import { LoginPost } from '@/types/auth';
import { useLocalStorage } from '@/utils/localStorage.util';

const router = useRouter();
const loginPostData: Ref<LoginPost> = ref({
  account: '',
  password: '',
});
const isPwd = shallowRef(true);

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
  <div class="row justify-center">
    <div class="col-12 row justify-center text-capitalize">
      <div class="col-12 row justify-center">
        <q-img
          src="ninjaccc.ico"
          ratio="1"
          sizes="32px"
          width="72px"
        />
      </div>
      <h1 class="col-12 text-center text-h5">
        {{ $t('ninjutsuMemorizeVocabulary') }}
      </h1>
      <h2 class="col-12 text-center text-h6">
        {{ $t('MenuEnum.Login') }}
      </h2>
    </div>

    <q-form
      class="col-6 row"
      @submit="login"
    >
      <q-input
        class="col-12"
        v-model="loginPostData.account"
        :label="$t('account')"
        :rules="[required()]"
      />
      <q-input
        class="col-12"
        :type="isPwd ? 'password' : 'text'"
        v-model="loginPostData.password"
        :label="$t('password')"
        :rules="[required()]"
      >
        <template #append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <div class="col-12 row justify-center">
        <q-btn
          class="q-mt-md"
          type="submit"
          color="primary"
          :label="$t('login')"
        />
      </div>
    </q-form>
  </div>
</template>
