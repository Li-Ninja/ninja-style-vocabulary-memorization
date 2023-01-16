import { defineStore } from 'pinia';
import {
  readonly,
  shallowReactive,
  toRefs,
} from 'vue';
import { useReviewApi } from '@/apis/review.api';
import {
  ReviewLog,
  ReviewWord,
  ReviewWordPost,
} from '@/types/review';

export const useApiReviewStore = defineStore('apiReview', () => {
  // state
  const state = shallowReactive({
    reviewWordList: [] as ReviewWord[],
    reviewLogList: [] as ReviewLog[],
  });

  async function getReviewWordList() {
    const data = await useReviewApi().getReviewWordList();

    state.reviewWordList = data;
  }

  async function getReviewLogList() {
    const data = await useReviewApi().getReviewLogList();

    state.reviewLogList = data;
  }

  async function postReviewWordList(postData: ReviewWordPost[]) {
    const data = useReviewApi().postReviewWordList(postData);

    return data;
  }

  return {
    ...toRefs(readonly(state)),
    getReviewWordList,
    getReviewLogList,
    postReviewWordList,
  };
});
