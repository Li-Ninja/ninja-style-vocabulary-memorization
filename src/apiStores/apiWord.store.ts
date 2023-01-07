import { defineStore } from 'pinia';
import {
  readonly,
  shallowReactive,
  toRefs
} from 'vue';
import { useWordApi } from '@/apis/word.api';
import { Word } from '@/types/word';

export const useApiWordStore = defineStore('apiWord', () => {
  // state
  const state = shallowReactive({
    wordList: [] as Word[]
  });

  async function getWordList() {
    const data = await useWordApi().getWordList();

    state.wordList = data;
  }

  return {
    ...toRefs(readonly(state)),
    getWordList
  };
});
