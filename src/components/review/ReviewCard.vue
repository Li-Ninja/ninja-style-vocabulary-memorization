<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { shallowRef } from 'vue';
import {
  ReviewWord, ReviewWordPost,
} from '@/types/review';

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
    <q-card>
      <q-card-section
        @click="updateIsShowAnswer(!isShowAnswer)"
        class="bg-primary text-white cursor-pointer"
      >
        <q-badge
          align="top"
          color="accent"
          floating
          class="text-uppercase"
        >
          {{ isShowAnswer ? 'A' : 'Q' }}
        </q-badge>
        <div class="text-h6 text-center">
          {{ isShowAnswer ? props.answer : props.question }}
        </div>
      </q-card-section>

      <q-card-actions align="around">
        <q-btn
          class="col"
          :disable="!isShowAnswer"
          @click="sendIsCorrect(false)"
          :icon="isShowAnswer ? 'mdi-close-circle' : 'mdi-circle'"
          flat
        />
        <q-btn
          class="col"
          :disable="!isShowAnswer"
          :icon="isShowAnswer ? 'mdi-checkbox-marked-circle' : 'mdi-circle'"
          @click="sendIsCorrect(true)"
          flat
        />
      </q-card-actions>
    </q-card>
  </div>
</template>
