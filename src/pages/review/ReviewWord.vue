<script setup lang="ts">
import { HttpStatusCode } from 'axios';
import {
  ref,
  shallowRef,
  watch,
  Ref,
} from 'vue';
import { storeToRefs } from 'pinia';
import { Notify } from 'quasar';
import ReviewCardList from '@/components/review/ReviewCardList.vue';
import { ReviewWordPost } from '@/types/review';
import { useApiReviewStore } from '@/apiStores/apiReview.store';

const { getReviewWordList, postReviewWordList } = useApiReviewStore();
const { reviewWordList } = storeToRefs(useApiReviewStore());
const reviewWordPostList: Ref<ReviewWordPost[]> = ref([]);
const isShowCard = shallowRef(true);

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
  const data = await postReviewWordList(reviewWordPostList.value);

  if (data.status === HttpStatusCode.Ok) {
    Notify.create({
      message: data.statusText,
      color: 'primary',
    });

    void getReviewWordList();
  } else {
    Notify.create({
      message: data.statusText,
      color: 'negative',
    });
  }
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
  <div class="row justify-center">
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
            label="送出"
            @click="sendData()"
          />
          <q-btn
            color="primary"
            label="重新練習"
            @click="getReviewWordList()"
          />
        </q-btn-group>
      </div>
    </template>
  </div>
</template>
