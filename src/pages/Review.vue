<script setup lang="ts">
import { HttpStatusCode } from 'axios';
import { storeToRefs } from 'pinia';
import {
  Dialog, Notify,
} from 'quasar';
import {
  Ref, ref, shallowRef, watch,
} from 'vue';
import { useApiReviewStore } from '@/apiStores/apiReview.store';
import ReviewCardList from '@/components/review/ReviewCardList.vue';
import { useI18n } from '@/composables/useI18n';
import { ReviewWordPost } from '@/types/review';

const { getReviewWordList, postReviewWordList } = useApiReviewStore();
const { reviewWordList } = storeToRefs(useApiReviewStore());
const reviewWordPostList: Ref<ReviewWordPost[]> = ref([]);
const isShowCard = shallowRef(true);
const { t } = useI18n();

void getReviewWordList();

watch(() => reviewWordList, () => {
  isShowCard.value = true;

  reviewWordPostList.value = reviewWordList.value.map(review => ({
    word_id: review.word_id,
    isCorrect: null,
    reviewInfo: review.reviewInfo,
  }));
}, { deep: true });

async function sendData() {
  const res = await postReviewWordList(reviewWordPostList.value);

  if (res?.status === HttpStatusCode.Ok) {
    Notify.create({
      message: res?.statusText,
      color: 'primary',
    });

    void getReviewWordList();
  } else {
    Notify.create({
      message: res?.statusText,
      color: 'negative',
    });
  }
}

function restart() {
  Dialog.create({
    title: t('restart'),
    message: t('checkRestart'),
    focus: 'none',
    ok: {
      'text-color': 'secondary',
      flat: true,
    },
  }).onOk(() => {
    void getReviewWordList();
  });
}

watch(() => reviewWordPostList, () => {
  const isShow = !!reviewWordPostList.value.find(item => item.isCorrect === null);

  if (isShow) {
    return;
  }

  isShowCard.value = false;
}, { deep: true, immediate: true });

</script>

<template>
  <div class="row justify-center items-center full-height">
    <template v-if="isShowCard">
      <ReviewCardList
        class="col-6"
        :review-word-list="reviewWordList"
        :review-word-post-list="reviewWordPostList"
      />
    </template>
    <template v-else>
      <div class="q-pa-md col-6">
        <q-btn-group spread>
          <q-btn
            color="primary"
            icon="mdi-restart"
            flat
            class="text-uppercase"
            :label="$t('restart')"
            @click="restart()"
          />
          <q-btn
            color="primary"
            icon="mdi-send"
            class="text-uppercase"
            :label="$t('submit')"
            @click="sendData()"
          />
        </q-btn-group>
      </div>
    </template>
  </div>
</template>
