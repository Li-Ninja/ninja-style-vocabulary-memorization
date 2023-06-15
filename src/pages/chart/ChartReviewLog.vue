<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { QTableColumn } from 'quasar';
import { useApiReviewStore } from '@/apiStores/apiReview.store';
import { ReviewLog } from '@/types/review';

const { getReviewLogList } = useApiReviewStore();
const { reviewLogList } = storeToRefs(useApiReviewStore());

void getReviewLogList();

const columns: Array<QTableColumn<ReviewLog>> = [
  {
    name: '_id',
    label: '_id',
    align: 'center',
    field: row => row['_id'],
  },
  {
    name: 'createAt',
    label: 'createAt',
    align: 'center',
    field: row => row.createAt,
  },
  {
    name: 'isCorrect',
    label: 'isCorrect',
    align: 'center',
    field: row => row.isCorrect,
  },
  {
    name: 'reviewInfo',
    label: 'reviewInfo',
    align: 'center',
    field: row => row.reviewInfo,
  },
  {
    name: 'type',
    label: 'type',
    align: 'center',
    field: row => row.type,
  },
  {
    name: 'question',
    label: 'question',
    align: 'center',
    field: row => row.question,
  },
  {
    name: 'answer',
    label: 'answer',
    align: 'center',
    field: row => row.answer,
  },
];

</script>

<template>
  <div>
    <q-item class="q-pa-none q-mb-md">
      <q-item-section>
        <q-btn
          class="text-capitalize"
          @click="getReviewLogList"
          color="primary"
        >
          {{ $t('search') }}
        </q-btn>
      </q-item-section>
    </q-item>
    <q-table
      :rows="reviewLogList"
      :columns="columns"
      row-key="name"
    >
      <template #body-cell-reviewInfo="props">
        <q-td
          key="reviewInfo"
          :props="props"
        >
          <div>
            ratio: {{ props.row.reviewInfo.ratio }}
          </div>
          <div>
            minutes: {{ props.row.reviewInfo.minutes }}
          </div>
          <div>
            count: {{ props.row.reviewInfo.count }}
          </div>
          <div>
            initialReviewAt: {{ props.row.reviewInfo.initialReviewAt }}
          </div>
          <div>
            nextReviewAt: {{ props.row.reviewInfo.nextReviewAt }}
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>
