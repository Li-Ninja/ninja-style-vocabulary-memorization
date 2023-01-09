<script setup lang="ts">
import {
  shallowRef,
  watch,
  DeepReadonly
} from 'vue';
import { useVModel } from '@vueuse/core';
import { Review, ReviewPost } from '@/types/review';
import ReviewCard from '@/components/review/ReviewCard.vue';

const props = defineProps<{
reviewList: DeepReadonly<Review[]>;
postList: ReviewPost[];
}>();
const emits = defineEmits(['update:postList']);

// deep is need to set passive = true
const postList = useVModel(props, 'postList', emits, { passive: true, deep: true });

const index = shallowRef(0);

watch(() => postList, () => {
  if (postList.value.length - 1 === index.value) {
    return;
  }

  index.value += 1;
}, { deep: true });

</script>

<template>
  <div>
    <ReviewCard
      :question="reviewList[index].question"
      :answer="reviewList[index].answer"
      v-model:is-correct="postList[index].isCorrect"
    />
  </div>
</template>
