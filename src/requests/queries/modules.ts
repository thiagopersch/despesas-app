import { FormattedModules, Modules } from '@/model/Modules';
import createApi from '@/services/api';
import { modulesMapper } from '@/utils/mappers';
import { Session } from 'next-auth';

type ListModulesFilters = {
  id?: string;
  code?: string;
  name?: string;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export const listModules = async (
  session?: Session | null,
  filters: ListModulesFilters = {},
): Promise<FormattedModules[]> => {
  const api = createApi(session);

  const { ...restParams } = filters;

  const params = { ...restParams } as any;

  const response = await api.get<Modules[]>('/modules', { params });
  return response.data.map(modulesMapper);
};
