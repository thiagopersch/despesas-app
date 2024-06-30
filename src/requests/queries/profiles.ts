import { Profiles, FormattedProfiles  } from '@/model/Profiles';
import createApi from '@/services/api';
import { profilesMapper } from '@/utils/mappers';
import { Session } from 'next-auth';

type ListProfilesFilters = {}

export const listProfiles = async (
  session?: Session | null,
  filters: ListProfilesFilters = {},
): Promise<FormattedProfiles[]> => {
  const api = createApi(session);

  const { ...restParams } = filters;

  const params = { ...restParams } as any;

  const response = await api.get<Profiles[]>('/profiles', { params });
  return response.data.map(profilesMapper);
}
