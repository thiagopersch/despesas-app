import {
  FormattedPaymentMethods,
  PaymentMethods,
} from '@/model/PaymentMethods';
import createApi from '@/services/api';
import { paymentMethodsMapper } from '@/utils/mappers';
import { Session } from 'next-auth';

type ListPaymentMethodsFilters = {
  id?: string;
  name?: string;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export const ListPaymentMethods = async (
  session?: Session | undefined,
  filters: ListPaymentMethodsFilters = {},
): Promise<FormattedPaymentMethods[]> => {
  const api = createApi(session);

  const { ...rest } = filters;

  const params = { ...rest };

  const result = await api.get<PaymentMethods[]>('/paymentMethods', { params });
  return result.data.map(paymentMethodsMapper);
};
