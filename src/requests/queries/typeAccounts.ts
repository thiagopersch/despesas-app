import { FormattedTypeAccounts, TypeAccounts } from '@/model/TypeAccounts';
import createApi from '@/services/api';
import { typeAccountsMapper } from '@/utils/mappers';
import { Session } from 'next-auth';

type ListTypeAccountsFilters = {
  id?: string;
  bank_code?: string;
  bank_name?: string;
  bank_type?: string;
  bank_color?: string;
  status?: boolean;
};

export const listTypeAccounts = async (
  session?: Session | null,
  filters: ListTypeAccountsFilters = {},
): Promise<FormattedTypeAccounts[]> => {
  const api = createApi(session);

  const { ...restParams } = filters;

  const params = { ...restParams } as any;

  const response = await api.get<TypeAccounts[]>('/type-accounts', { params });
  return response.data.map(typeAccountsMapper);
};
