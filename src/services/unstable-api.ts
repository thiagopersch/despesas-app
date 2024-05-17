import { SESSION_KEYS } from '@/requests/queries/session';
import { isServer } from '@/utils/isServer';
import { getSession } from 'next-auth/react';
import createApi from './api';
import queryClient from './queryClient';

const unstable__api = createApi();

if (!isServer) {
  unstable__api.interceptors.request.use(async (config) => {
    const session = queryClient.getQueryData<{ token?: string }>([
      SESSION_KEYS.all,
    ]);
    let token = session?.token;

    const isSessionRequest =
      config.url === `${process.env.NEXT_PUBLIC_APP_URL}/auth/session`;

    if (!token && !isSessionRequest) {
      const newSession = await getSession();
      queryClient.setQueryData([SESSION_KEYS.all], newSession);

      token = newSession?.jwt;
    }

    const authorization = token ? `Bearer ${token}` : '';
    config.headers.authorization = authorization;

    return config;
  });
}

export const createUnstableApi = (session?: any) => {
  const authorization = session?.token ? `Bearer ${session.token}` : '';
  unstable__api.defaults.headers.authorization = authorization;

  return unstable__api;
};

export { unstable__api };
