<script setup lang="ts">
import { MenuEnum } from 'src/enums/common.enum';
import { useI18n } from '@/composables/useI18n';

/** base */
const { t } = useI18n();

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
