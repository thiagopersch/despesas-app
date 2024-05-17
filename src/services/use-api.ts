import { useMemo } from 'react';
import createApi from './api';

export function useApi(session: never) {
  const store = useMemo(() => createApi(session), [session]);
  return store;
}
