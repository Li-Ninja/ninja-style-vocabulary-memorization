<script setup lang="ts">
import { MenuEnum } from 'src/enums/common.enum';

const tabs = [
  {
    name: MenuEnum.ReviewWord,
    icon: 'mdi-sword',
    to: {
      name: MenuEnum.ReviewWord,
    },
  },
  {
    name: MenuEnum.ReviewLog,
    icon: 'mdi-clipboard-text-clock',
    to: {
      name: MenuEnum.ReviewLog,
    },
  },
];

</script>

<template>
  <div>
    <q-tabs
      indicator-color="transparent"
      active-color="white"
      class="bg-teal text-grey-5 shadow-2 q-mb-md"
    >
      <q-route-tab
        v-for="tab in tabs"
        :key="tab.name"
        :icon="tab.icon"
        :to="tab.to"
        :label="tab.name"
        exact
      />
    </q-tabs>

    <suspense>
      <router-view />
    </suspense>
  </div>
</template>
