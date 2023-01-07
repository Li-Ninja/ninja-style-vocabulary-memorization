import { useApi } from '@/composables/useApi';

const { getApi } = useApi();

export function useWordApi() {
  const url = {
    wordList: '/word/list'
  };

  function getWordList() {
    return getApi(url.wordList);
  }

  return {
    getWordList
  };
}
