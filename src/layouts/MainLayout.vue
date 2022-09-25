<script setup lang="ts">
import { MenuEnum } from 'src/enums/common.enum';

const tabs = [
  {
    name: MenuEnum.Home,
    icon: 'mdi-home',
    to: ''
  },
  {
    name: MenuEnum.Record,
    icon: 'mdi-file-search',
    to: MenuEnum.Record
  },
  {
    name: MenuEnum.Edit,
    icon: 'mdi-pencil',
    to: MenuEnum.Edit
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
