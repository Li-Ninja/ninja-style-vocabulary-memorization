<script setup lang="ts">
import { QTableColumn } from 'quasar';
import { storeToRefs } from 'pinia';
import { MenuEnum } from '@/enums/common.enum';
import { useApiWordStore } from '@/apiStores/apiWord.store';
import { Word } from '@/types/word';

const { getWordList } = useApiWordStore();
const { wordList } = storeToRefs(useApiWordStore());

void getWordList();

const columns: Array<QTableColumn<Word>> = [
  {
    name: 'question',
    label: 'question',
    align: 'center',
    field: row => row.text.question
  },
  {
    name: 'answer',
    label: 'answer',
    align: 'center',
    field: row => row.text.answer
  }
];

</script>

<template>
  <div class="q-pa-md">
    <div class="row">
      <q-btn
        class="col-6"
        @click="getWordList"
        color="primary"
      >
        重新搜尋
      </q-btn>
      <q-btn
        class="col-6"
        :to="{ name: MenuEnum.WordAdd }"
        color="secondary"
      >
        增加
      </q-btn>
    </div>
    <q-table
      :rows="wordList"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>
