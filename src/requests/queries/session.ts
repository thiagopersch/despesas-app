import createApi from '@/services/api';
import { Session } from 'next-auth';

type FetchSessionFilters = {
  login?: string;
  password?: string;
};

export const SESSION_KEYS = {
  all: ['sessions'] as const,
  user: () => [...SESSION_KEYS.all, 'user'] as const,
  accessModules: () => [...SESSION_KEYS.all, 'accessModules'] as const,
  profile: () => [...SESSION_KEYS.all, 'profile'] as const,
} as const;

export const FetchSession = async (
  session?: Session | null,
  filters: FetchSessionFilters = {},
) => {
  const api = createApi(session);

  const { ...restParams } = filters;

  const params = { ...restParams } as any;

  const response = await api.post('/auth/signIn', { params });

  return response;
};
