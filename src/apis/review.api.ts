import { useApi } from '@/composables/useApi';
import { Review, ReviewPost } from '@/types/review';

const { getApi, postApi } = useApi();

export function useReviewApi() {
  const url = {
    review: '/review'
  };

  function getReviewList<D extends Review[]>() {
    return getApi<D>(url.review);
  }

  function postReviewList(postData: ReviewPost[]) {
    return postApi(url.review, postData);
  }

  return {
    getReviewList,
    postReviewList
  };
}
