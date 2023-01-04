import { boot } from 'quasar/wrappers';
import { useApi } from '@/composables/useApi';

export default boot(() => {
  useApi();
});
