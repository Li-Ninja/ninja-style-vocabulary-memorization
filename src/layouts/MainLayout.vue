<script setup lang="ts">
import { MenuEnum } from 'src/enums/common.enum';

const tabs = [
  {
    name: MenuEnum.Home,
    icon: 'mdi-home',
    to: {
      name: MenuEnum.Home
    }
  },
  {
    name: MenuEnum.Word,
    icon: 'mdi-sticker-text',
    to: {
      name: MenuEnum.Word
    }
  },
  {
    name: MenuEnum.Review,
    icon: 'mdi-file-search',
    to: {
      name: MenuEnum.Review
    }
  }
];

</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-tabs dense>
        <q-route-tab
          v-for="tab in tabs"
          :key="tab.name"
          :icon="tab.icon"
          :to="tab.to"
          :label="tab.name"
          exact
        />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
