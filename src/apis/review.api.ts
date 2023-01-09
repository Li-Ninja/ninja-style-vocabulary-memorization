import { useApi } from '@/composables/useApi';
import {
  ReviewLog,
  ReviewWord,
  ReviewWordPost
} from '@/types/review';

const { getApi, postApi } = useApi();

export function useReviewApi() {
  const url = {
    reviewWordList: '/review/wordList',
    reviewLogList: '/review/logList'
  };

  function getReviewWordList<D extends ReviewWord[]>() {
    return getApi<D>(url.reviewWordList);
  }

  function getReviewLogList<D extends ReviewLog[]>() {
    return getApi<D>(url.reviewLogList);
  }

  function postReviewWordList(postData: ReviewWordPost[]) {
    return postApi(url.reviewWordList, postData);
  }

  return {
    getReviewWordList,
    getReviewLogList,
    postReviewWordList
  };
}
