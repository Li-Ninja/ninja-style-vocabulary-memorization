<script setup lang="ts">
import { shallowRef } from 'vue';
import { useI18n } from '@/composables/useI18n';
import { MenuEnum } from '@/enums/common.enum';

const tab = shallowRef(MenuEnum.ChartReviewLog);
const { t } = useI18n();

const tabList = [
  {
    name: MenuEnum.ChartReviewLog,
    label: t('MenuEnum.ChartReviewLog'),
  },
];

</script>

<template>
  <div>
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab
        v-for="(item, index) in tabList"
        :key="index"
        :name="item.name"
        :label="item.label"
      />
    </q-tabs>

    <q-separator />

    <q-tab-panels
      v-model="tab"
    >
      <q-tab-panel
        v-for="item in tabList"
        :key="item.name"
        :name="item.name"
      >
        <router-view />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
