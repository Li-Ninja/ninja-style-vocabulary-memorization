<script setup lang="ts">
import { HttpStatusCode } from 'axios';
import { Notify } from 'quasar';
import {
  Ref, ref,
} from 'vue';
import { useRouter } from 'vue-router';
import { useApiWordStore } from '@/apiStores/apiWord.store';
import { MenuEnum } from '@/enums/common.enum';
import { WordPost } from '@/types/word';

const { postWordList } = useApiWordStore();
const router = useRouter();

const defaultWordPost: WordPost = {
  // TODO can choose another type
  type: 'card',
  question: '',
  answer: '',
};
const postList: Ref<WordPost[]> = ref([{ ...defaultWordPost }]);

function onReset() {
  postList.value.length = 0;
  postList.value.push({ ...defaultWordPost });
}

async function onSubmit() {
  const res = await postWordList(postList.value);

  if (res?.status === HttpStatusCode.Ok) {
    Notify.create({
      message: res.statusText,
      color: 'primary',
    });

    router.push({ name: MenuEnum.Word });
  } else {
    Notify.create({
      message: res?.statusText,
      color: 'negative',
    });
  }
}

function addField() {
  postList.value.push({ ...defaultWordPost });
}

</script>

<template>
  <div class="q-pa-md">
    <q-btn
      class="q-mb-md"
      @click="addField()"
      color="secondary"
    >
      增加欄位
    </q-btn>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
    >
      <div
        v-for="(word, key) in postList"
        :key="key"
        class="q-mb-md row q-col-gutter-md"
      >
        <q-field class="col-1">
          <template #control>
            {{ key + 1 }}
          </template>
        </q-field>
        <q-input
          class="col-5"
          filled
          type="text"
          v-model="word.question"
          label="question"
          lazy-rules
          :rules="[ (val) => val && val !== null && val.length > 0 || '必填']"
        />

        <q-input
          class="col-5"
          filled
          type="text"
          v-model="word.answer"
          label="answer"
          lazy-rules
          :rules="[ (val) => val && val !== null && val.length > 0 || '必填']"
        />
      </div>

      <div>
        <q-btn
          label="送出"
          type="submit"
          color="primary"
        />
        <q-btn
          label="重置"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>
