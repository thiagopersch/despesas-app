import createApi from '@/services/api';
import { unstable__api } from '@/services/unstable-api';
import { isServer } from '@/utils/isServer';
import { Session } from 'next-auth';

type FetchSessionFilters = {
  login?: string;
  password?: string;
};

const BASE_URL = isServer
  ? process.env.APP_URL_INTERNAL
  : process.env.NEXT_PUBLIC_APP_URL;

export const SESSION_KEYS = {
  all: ['sessions'] as const,
  user: () => [...SESSION_KEYS.all, 'users'] as const,
  accessModules: () => [...SESSION_KEYS.all, 'accessModules'] as const,
  profile: () => [...SESSION_KEYS.all, 'profile'] as const,
} as const;

export const getSession = async () => {
  try {
    const response = await unstable__api.get<{ token?: string }>(
      `${BASE_URL}/api/session`,
    );
    return response.data;
  } catch {
    return undefined;
  }
};

export const FetchSession = async (
  session?: Session | undefined,
  filters: FetchSessionFilters = {},
) => {
  const api = createApi(session);

  const { ...restParams } = filters;

  const params = { ...restParams } as any;

  const response = await api.post('/auth/signIn', { params });

  return response;
};
