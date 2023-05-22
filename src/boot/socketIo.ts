import { boot } from 'quasar/wrappers';
import { bootSocketIo } from '@/composables/useSocketIo';

export default boot(() => {
  bootSocketIo(process.env.API_DOMAIN);
});
