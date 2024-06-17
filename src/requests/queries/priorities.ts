import { FormattedPriority, Priority } from '@/model/Priority';
import createApi from '@/services/api';
import { priorityMapper } from '@/utils/mappers';
import { Session } from 'next-auth';

type ListPrioritiesFilters = {
  id?: string;
  name?: string;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export const listPriorities = async (
  session?: Session | undefined,
  filters: ListPrioritiesFilters = {},
): Promise<FormattedPriority[]> => {
  const api = createApi(session);

  const { ...rest } = filters;

  const params = { ...rest };

  const result = await api.get<Priority[]>('/priority', { params });
  return result.data.map(priorityMapper);
};
