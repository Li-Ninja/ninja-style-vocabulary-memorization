<script setup lang="ts">
import { shallowRef } from 'vue';
import { useVModel } from '@vueuse/core';
import { ReviewWord, ReviewWordPost } from '@/types/review';

const props = defineProps<{
  question: ReviewWord['question'];
  answer: ReviewWord['answer'];
  isCorrect: ReviewWordPost['isCorrect'];
}>();
const emits = defineEmits(['update:isCorrect']);
const isShowAnswer = shallowRef(false);

// deep is need to set passive = true
const isCorrect = useVModel(props, 'isCorrect', emits, { passive: true, deep: true });

function updateIsShowAnswer(val: boolean) {
  isShowAnswer.value = val;
}

function resetIsShowAnswer() {
  isShowAnswer.value = false;
}

function sendIsCorrect(val: boolean) {
  isCorrect.value = val;
  resetIsShowAnswer();
}

</script>

<template>
  <div>
    <q-card v-if="!isShowAnswer">
      <q-card-section
        @click="updateIsShowAnswer(true)"
        class="bg-primary text-white cursor-pointer"
      >
        <div class="text-h6 text-center">
          {{ props.question }}
        </div>
      </q-card-section>
    </q-card>

    <q-card v-else>
      <q-card-section
        @click="updateIsShowAnswer(false)"
        class="bg-primary text-white cursor-pointer"
      >
        <div class="text-h6 text-center">
          {{ props.answer }}
        </div>
      </q-card-section>

      <q-card-actions align="around">
        <q-btn
          class="col"
          @click="sendIsCorrect(true)"
          flat
        >
          答對
        </q-btn>
        <q-btn
          class="col"
          @click="sendIsCorrect(false)"
          flat
        >
          答錯
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>
