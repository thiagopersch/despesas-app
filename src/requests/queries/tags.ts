import { FormattedTags, Tags } from '@/model/Tags';
import createApi from '@/services/api';
import { tagsMapper } from '@/utils/mappers';
import { Session } from 'next-auth';

type ListTagsFilters = {
  id?: string;
  name?: string;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export const listTags = async (
  session?: Session | null,
  filters: ListTagsFilters = {},
): Promise<FormattedTags[]> => {
  const api = createApi(session);

  const { ...restParams } = filters;

  const params = { ...restParams } as any;

  const response = await api.get<Tags[]>('/tags', { params });
  return response.data.map(tagsMapper);
};
