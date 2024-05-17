import { unstable__api } from '@/services/unstable-api';
import { isServer } from '@/utils/isServer';

type CreateSessionParams = {
  login: string;
  password: string;
};

export const createSession = (params: CreateSessionParams) => {
  const baseURL = isServer
    ? process.env.APP_URL_INTERNAL
    : process.env.NEXT_PUBLIC_APP_URL;

  return unstable__api.post(`${baseURL}/api/session`, params);
};
