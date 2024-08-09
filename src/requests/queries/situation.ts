import { FormattedSituation, Situation } from '@/model/Situation';
import createApi from '@/services/api';
import { situationMapper } from '@/utils/mappers';
import { Session } from 'next-auth';

type ListSituationFilters = {
  id?: string;
  name?: string;
  color?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

export const listSituation = async (
  session?: Session | null,
  filters: ListSituationFilters = {},
): Promise<FormattedSituation[]> => {
  const api = createApi(session);

  const { ...restParams } = filters;

  const params = { ...restParams } as any;

  const response = await api.get<Situation[]>('/situations', { params });
  return response.data.map(situationMapper);
};
