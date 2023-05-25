import { useApi } from '@/composables/useApi';
import {
  Word, WordPost,
} from '@/types/word';

const { getApi, postApi } = useApi();

export function useWordApi() {
  const url = {
    word: '/word',
    wordList: '/word/list',
  };

  function getWordList() {
    return getApi<Word[]>(url.wordList);
  }

  function postWord(postData: WordPost[]) {
    return postApi(url.word, postData);
  }

  return {
    getWordList,
    postWord,
  };
}
