import { FormattedYear, Year } from '@/model/Year';
import createApi from '@/services/api';
import { yearMapper } from '@/utils/mappers';
import { Session } from 'next-auth';

type ListYearsFilters = {
  id?: string;
  year?: string;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export const ListYears = async (
  session?: Session | undefined,
  filters: ListYearsFilters = {},
): Promise<FormattedYear[]> => {
  const api = createApi(session);

  const { ...rest } = filters;

  const params = { ...rest };

  const result = await api.get<Year[]>('/years', { params });
  return result.data.map(yearMapper);
};
