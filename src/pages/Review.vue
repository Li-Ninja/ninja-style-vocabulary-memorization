<script setup lang="ts">
import { useReviewApi } from '@/apis/review.api';

const { getReviewList } = useReviewApi();
const reviewList = await getReviewList();

</script>

<template>
  <h1>Review</h1>

  <ul>
    <li
      v-for="(review, key) in reviewList"
      :key="key"
    >
      {{ review.question }}
    </li>
  </ul>
</template>
