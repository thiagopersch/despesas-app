import { Category, FormattedCategory } from '@/model/Category';
import createApi from '@/services/api';
import { categoryMapper } from '@/utils/mappers';
import { Session } from 'next-auth';

type ListCategoriesFilters = {
  id?: string;
  image?: string;
  name?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

export const listcategories = async (
  session?: Session | undefined,
  filters: ListCategoriesFilters = {},
): Promise<FormattedCategory[]> => {
  const api = createApi(session);

  const { ...restParams } = filters;

  const params = { ...restParams } as any;

  const response = await api.get<Category[]>('/category', { params });
  return response.data.map(categoryMapper);
};
