import { App } from 'vue';
import { createI18n } from 'vue-i18n';
import { LanguageEnum } from '@/enums/common.enum';
import enJson from '@/i18n/en.json';
import zhTwJson from '@/i18n/zh-tw.json';
import { useLocalStorage } from '@/utils/localStorage.util';

const { getLang } = useLocalStorage();

const i18n = createI18n({
  locale: getLang(),
  messages: {
    [LanguageEnum.en]: enJson,
    [LanguageEnum['zh-tw']]: zhTwJson,
  },
});

export function prepareI18n(app: App<any>) {
  app.use(i18n);
}

export function useI18n() {
  return i18n?.global;
}
