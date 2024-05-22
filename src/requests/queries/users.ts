import { FormattedUsers, User } from '@/model/User';
import createApi from '@/services/api';
import { userMapper } from '@/utils/mappers';
import { Session } from 'next-auth';

type ListUsersFilters = {
  id?: string;
  name?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

export const listUsers = async (
  session?: Session | undefined,
  filters: ListUsersFilters = {},
): Promise<FormattedUsers[]> => {
  const api = createApi(session);

  const { ...restParams } = filters;

  const params = { ...restParams } as any;

  const response = await api.get<User[]>('/users', { params });
  return response.data.map(userMapper);
};
