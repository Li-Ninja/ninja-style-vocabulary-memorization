import { useApi } from '@/composables/useApi';
import { Review } from '@/types/review';

const { getApi } = useApi();

export function useReviewApi() {
  const url = {
    getReviewList: '/review'
  };

  function getReviewList<D extends Review[]>() {
    return getApi<D>(url.getReviewList);
  }

  return {
    getReviewList
  };
}
