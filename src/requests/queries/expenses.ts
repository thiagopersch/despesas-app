import { Expenses, FormattedExpenses } from '@/model/Expenses';
import createApi from '@/services/api';
import { expensesMapper } from '@/utils/mappers';
import { Session } from 'next-auth';

type ListExpensesFilters = {
  id?: string;
  user_name?: string;
  user_id?: string;
  payment_methods_name?: string;
  payment_methods_id?: string;
  priority_name?: string;
  priority_id?: string;
  month_name?: string;
  month_id?: string;
  category_name?: string;
  category_id?: string;
  tags_name?: string;
  tags_id?: string;
  type_account_name?: string;
  type_account_id?: string;
  name?: string;
  description?: string;
  amount_to_pay?: string;
  amount_paid?: string;
  pay_day?: string;
  due_date?: string;
  fixed_expense?: string;
  repeat?: string;
  number_repeat?: string;
  type_repeat?: string;
  situation?: string;
  createdAt?: string;
  updatedAt?: string;
};

export const listExpenses = async (
  session?: Session | null,
  filters: ListExpensesFilters = {},
): Promise<FormattedExpenses[]> => {
  const api = createApi(session);

  const { ...restParams } = filters;

  const params = { ...restParams } as any;

  const response = await api.get<Expenses[]>('/expenses', { params });
  return response.data.map(expensesMapper);
};
