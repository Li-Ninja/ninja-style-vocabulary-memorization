import { defineStore } from 'pinia';
import {
  readonly,
  shallowReactive,
  toRefs,
} from 'vue';
import { useWordApi } from '@/apis/word.api';
import { Word, WordPost } from '@/types/word';

export const useApiWordStore = defineStore('apiWord', () => {
  // state
  const state = shallowReactive({
    wordList: [] as Word[],
  });

  async function getWordList() {
    const res = await useWordApi().getWordList();

    if (res?.data?.data) {
      state.wordList = res.data.data;
    }
  }

  function postWordList(postData: WordPost[]) {
    return useWordApi().postWord(postData);
  }

  return {
    ...toRefs(readonly(state)),
    getWordList,
    postWordList,
  };
});
