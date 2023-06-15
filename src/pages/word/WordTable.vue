<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { QTableColumn } from 'quasar';
import { useApiWordStore } from '@/apiStores/apiWord.store';
import { useI18n } from '@/composables/useI18n';
import { MenuEnum } from '@/enums/common.enum';
import { Word } from '@/types/word';

/** base */
const { getWordList } = useApiWordStore();
const { wordList } = storeToRefs(useApiWordStore());
const { t } = useI18n();

void getWordList();

const columns: Array<QTableColumn<Word>> = [
  {
    name: 'question',
    label: t('question'),
    align: 'center',
    field: row => row.text.question,
  },
  {
    name: 'answer',
    label: t('answer'),
    align: 'center',
    field: row => row.text.answer,
  },
];

const pagination = {
  rowsPerPage: 10,
};

</script>

<template>
  <div>
    <q-item class="q-pa-none q-mb-md">
      <q-item-section>
        <q-btn
          class="text-capitalize"
          @click="getWordList"
          color="primary"
        >
          {{ $t('search') }}
        </q-btn>
      </q-item-section>
      <q-item-section>
        <q-btn
          class="text-capitalize"
          :to="{ name: MenuEnum.WordAdd }"
          color="secondary"
        >
          {{ $t('add') }}
        </q-btn>
      </q-item-section>
    </q-item>
    <q-table
      class="text-capitalize"
      :rows="wordList"
      :columns="columns"
      row-key="name"
      :pagination="pagination"
      :dark="true"
    />
  </div>
</template>
