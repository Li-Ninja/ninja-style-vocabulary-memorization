<script setup lang="ts">
import { Notify } from 'quasar';
import {
  onBeforeUnmount, onMounted,
} from 'vue';
import { useI18n } from '@/composables/useI18n';
import { useSocketIo } from '@/composables/useSocketIo';
import { ApiResponseData } from '@/types/api';

/** base */
const socketIo = useSocketIo();
const { t } = useI18n();

onMounted(() => {
  if (!socketIo) {
    return;
  }

  socketIo.on('wordReviewNotify', (data: ApiResponseData<{ hasReviewWord: boolean; count: number }>) => {
    if (data.data.hasReviewWord) {
      Notify.create({
        message: t('haveWordsNeedToReview', [data.data.count]),
        color: 'secondary',
        position: 'top',
      });
    }
  });
});

onBeforeUnmount(() => {
  if (!socketIo) {
    return;
  }

  socketIo.off('wordReviewNotify');
});

</script>

<template>
  <div class="column top text-capitalize text-h6">
    <div class="col-12 row justify-center q-mb-md">
      <q-img
        src="ninjaccc.ico"
        ratio="1"
        sizes="32px"
        width="72px"
      />
    </div>
    <div class="col-12 text-center">
      {{ $t('ninjaStyleVocabularyMemorization') }}
    </div>
    <div class="col-12 text-center">
      {{ $t('MenuEnum.Home') }}
    </div>
  </div>
</template>

<style lang="scss">
  .top {
    margin-top: 100px;
  }
</style>
