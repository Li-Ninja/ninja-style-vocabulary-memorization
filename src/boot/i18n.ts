import { boot } from 'quasar/wrappers';
import { prepareI18n } from '@/composables/useI18n';

export default boot(({ app }) => {
  prepareI18n(app);
});
