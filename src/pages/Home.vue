<script setup lang="ts">
import { Notify } from 'quasar';
import { onMounted, onBeforeUnmount } from 'vue';
import { useSocketIo } from '@/composables/useSocketIo';
import { ApiResponseData } from '@/types/api';

const { socketIo } = useSocketIo();

onMounted(() => {
  socketIo.on('wordReviewNotify', (data: ApiResponseData<{ hasReviewWord: boolean; count: number }>) => {
    if (data.data.hasReviewWord) {
      Notify.create({
        message: `have ${data.data.count} words need to review`,
        color: 'primary',
      });
    }
  });
});

onBeforeUnmount(() => {
  socketIo.off('wordReviewNotify');
});

</script>

<template>
  <h1>Home</h1>
</template>
