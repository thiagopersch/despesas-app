import { FormattedMonth, Month } from '@/model/Month';
import createApi from '@/services/api';
import { monthMapper } from '@/utils/mappers';
import { Session } from 'next-auth';

type ListMonthFilters = {
  id?: string;
  name?: string;
  year?: {
    year?: string;
  };
  yearId?: string;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export const listMonth = async (
  session?: Session | null,
  filters: ListMonthFilters = {},
): Promise<FormattedMonth[]> => {
  const api = createApi(session);

  const { ...restParams } = filters;

  const params = { ...restParams } as any;

  const response = await api.get<Month[]>('/months', { params });
  return response.data.map(monthMapper);
};
