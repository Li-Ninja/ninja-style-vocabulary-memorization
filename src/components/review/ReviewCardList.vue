<script setup lang="ts">
import {
  shallowRef,
  watch,
  DeepReadonly,
} from 'vue';
import { useVModel } from '@vueuse/core';
import { ReviewWord, ReviewWordPost } from '@/types/review';
import ReviewCard from '@/components/review/ReviewCard.vue';

const props = defineProps<{
reviewWordList: DeepReadonly<ReviewWord[]>;
reviewWordPostList: ReviewWordPost[];
}>();
const emits = defineEmits(['update:reviewWordPostList']);

// deep is need to set passive = true
const reviewWordPostList = useVModel(props, 'reviewWordPostList', emits, { passive: true, deep: true });

const index = shallowRef(0);

watch(() => reviewWordPostList, () => {
  if (reviewWordPostList.value.length - 1 === index.value) {
    return;
  }

  index.value += 1;
}, { deep: true });

</script>

<template>
  <div>
    <ReviewCard
      :question="reviewWordList[index].question"
      :answer="reviewWordList[index].answer"
      v-model:is-correct="reviewWordPostList[index].isCorrect"
    />
  </div>
</template>
