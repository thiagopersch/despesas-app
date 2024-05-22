import { isServer } from '@/utils/isServer';
import axios from 'axios';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';

const createApi = (session?: Session | null) => {
  const jwt = session?.token;
  const api = axios.create({
    baseURL:
      isServer && process.env.APP_ENV === 'production'
        ? process.env.SERVER_API_URL
        : process.env.NEXT_PUBLIC_API_URL,
    headers: {
      authorization: jwt ? `Bearer ${jwt}` : undefined,
    },
  });

  api.interceptors.request.use((config) => {
    const params = config.params || {};
    const newParams = Object.fromEntries(
      Object.entries(params).filter(
        ([_, value]) => value !== '' && value !== undefined && value !== null,
      ),
    );

    config.params = newParams;
    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      if (error.response?.status === 401) {
        signOut({
          callbackUrl: '/signIn',
          redirect: true,
        });
        return undefined;
      }

      return Promise.reject(error);
    },
  );

  return api;
};

export default createApi;
