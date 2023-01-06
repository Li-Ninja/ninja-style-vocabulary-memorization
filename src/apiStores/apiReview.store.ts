import { defineStore } from 'pinia';
import {
  readonly,
  shallowReactive,
  toRefs
} from 'vue';
import { useReviewApi } from '@/apis/review.api';
import { Review, ReviewPost } from '@/types/review';

export const useApiReviewStore = defineStore('apiReview', () => {
  // state
  const state = shallowReactive({
    reviewList: [] as Review[]
  });

  async function getReviewList() {
    const data = await useReviewApi().getReviewList();

    state.reviewList = data;
  }

  async function postReviewList(postData: ReviewPost[]) {
    const data = useReviewApi().postReviewList(postData);

    return data;
  }

  return {
    ...toRefs(readonly(state)),
    getReviewList,
    postReviewList
  };
});
