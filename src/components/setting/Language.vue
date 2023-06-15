<script setup lang="ts">
import { useRouter } from 'vue-router';
import {
  LanguageEnum, MenuEnum,
} from '@/enums/common.enum';
import { useLocalStorage } from '@/utils/localStorage.util';

const { setLang } = useLocalStorage();
const router = useRouter();

function goTo(name: MenuEnum) {
  router.push({ name });
}

function changeLang(lang: LanguageEnum) {
  setLang(lang);
  // because q-route-tab is not reactive, so we need to reload page
  window.location.reload();
}

</script>

<template>
  <div>
    <q-item class="q-pa-none">
      <q-item-section side>
        <q-btn
          @click="goTo(MenuEnum.Setting)"
          flat
          icon="mdi-chevron-left"
        />
      </q-item-section>
      <q-item-section class="text-h6 text-center q-mb-md">
        {{ $t('language') }}
      </q-item-section>
    </q-item>
    <q-list class="text-subtitle1">
      <q-item
        clickable
        @click="changeLang(LanguageEnum.en)"
      >
        {{ $t('LanguageEnum.En') }}
      </q-item>
      <q-item
        clickable
        @click="changeLang(LanguageEnum['zh-tw'])"
      >
        {{ $t('LanguageEnum.zhTw') }}
      </q-item>
    </q-list>
  </div>
</template>
