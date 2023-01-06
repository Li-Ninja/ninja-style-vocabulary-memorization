<script setup lang="ts">
import { HttpStatusCode } from 'axios';
import {
  ref,
  shallowRef,
  watch,
  Ref
} from 'vue';
import { storeToRefs } from 'pinia';
import { Notify } from 'quasar';
import ReviewCardList from '@/components/review/ReviewCardList.vue';
import { ReviewPost } from '@/types/review';
import { useApiReviewStore } from '@/apiStores/apiReview.store';

const { getReviewList, postReviewList } = useApiReviewStore();
const { reviewList } = storeToRefs(useApiReviewStore());
const postList: Ref<ReviewPost[]> = ref([]);
const isShowCard = shallowRef(true);

void getReviewList();

watch(() => reviewList, () => {
  isShowCard.value = true;

  postList.value = reviewList.value.map(review => ({
    id: review.id,
    isCorrect: null,
    reviewInfo: review.reviewInfo
  }));
}, { deep: true });

async function sendData() {
  const data = await postReviewList(postList.value);

  if (data.status === HttpStatusCode.Ok) {
    Notify.create({
      message: data.statusText,
      color: 'primary'
    });

    void getReviewList();
  } else {
    Notify.create({
      message: data.statusText,
      color: 'negative'
    });
  }
}

watch(() => postList, () => {
  const isShow = !!postList.value.find(item => item.isCorrect === null);

  if (isShow) {
    return;
  }

  isShowCard.value = false;
}, { deep: true, immediate: true });

</script>

<template>
  <h1>Review</h1>

  <div class="row justify-center">
    <template v-if="isShowCard">
      <ReviewCardList
        class="col-6"
        :review-list="reviewList"
        :post-list="postList"
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
            @click="getReviewList()"
          />
        </q-btn-group>
      </div>
    </template>
  </div>
</template>
