<script setup lang="ts">
import { HttpStatusCode } from 'axios';
import { Notify } from 'quasar';
import {
  Ref, ref,
} from 'vue';
import { useRouter } from 'vue-router';
import { useApiWordStore } from '@/apiStores/apiWord.store';
import { required } from '@/constants/rule.constant';
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

function removeField(index: number) {
  postList.value.splice(index, 1);
}

</script>

<template>
  <div>
    <q-item>
      <q-btn
        class="q-mb-md text-capitalize"
        @click="addField()"
        color="secondary"
        :label="$t('add')"
      />
    </q-item>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
    >
      <q-list>
        <q-item
          v-for="(word, key) in postList"
          :key="key"
          class="row"
        >
          <q-item-section class="col-1">
            <q-field>
              <template #control>
                {{ key + 1 }}
              </template>
            </q-field>
          </q-item-section>
          <q-item-section class="col-5">
            <q-input
              class="text-capitalize"
              filled
              type="text"
              v-model="word.question"
              :label="$t('question')"
              lazy-rules
              :rules="[required()]"
            />
          </q-item-section>
          <q-item-section class="col-5">
            <q-input
              class="text-capitalize"
              filled
              type="text"
              v-model="word.answer"
              :label="$t('answer')"
              lazy-rules
              :rules="[required()]"
            />
          </q-item-section>
          <q-item-section class="col-1">
            <q-btn
              v-if="key !== 0"
              flat
              icon="mdi-delete"
              color="negative"
              size="md"
              @click="removeField(key)"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-btn
            :label="$t('submit')"
            class="text-capitalize"
            type="submit"
            color="primary"
          />
          <q-btn
            :label="$t('reset')"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm text-capitalize"
          />
        </q-item>
      </q-list>
    </q-form>
  </div>
</template>
