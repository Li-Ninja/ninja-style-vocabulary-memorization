import { useI18n } from '@/composables/useI18n';
import {
  Arr,
  Msg,
} from '@/types/rule';

const i18n = useI18n();

function returnMessage<T, A extends Arr = Arr>(val: T, message: Msg<T>, ...args: [...A]) {
  return typeof message === 'function' ? message(val, ...args) : message;
}

export const required = <T = any>(message: Msg<T> = i18n.t('requiredFill')) => (val: T): true | string => !(val === undefined || val === ('' as any) || val === null) || returnMessage<T>(val, message);
