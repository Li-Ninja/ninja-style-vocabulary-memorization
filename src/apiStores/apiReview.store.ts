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
    // TODO can review count by custom, but max is 50
    const count = 10;
    const res = await useReviewApi().getReviewWordList({ count });

    if (res?.data.data) {
      state.reviewWordList = res.data.data;
    }
  }

  async function getReviewLogList() {
    const res = await useReviewApi().getReviewLogList();

    if (res?.data.data) {
      state.reviewLogList = res.data.data;
    }
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
