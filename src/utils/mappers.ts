import { Category, FormattedCategory } from '@/model/Category';
import { FormattedMonth, Month } from '@/model/Month';
import {
  FormattedPaymentMethods,
  PaymentMethods,
} from '@/model/PaymentMethods';
import { FormattedPriority, Priority } from '@/model/Priority';
import { FormattedUsers, User } from '@/model/User';
import { FormattedYear, Year } from '@/model/Year';
import dayjs from 'dayjs';

export const userMapper = (user: User): FormattedUsers => ({
  ...user,
  formattedCreatedAt: dayjs(user.createdAt).format('DD/MM/YYYY [às] HH:mm:ss'),
  formattedUpdatedAt: dayjs(user.updatedAt).format('DD/MM/YYYY [às] HH:mm:ss'),
});

export const categoryMapper = (category: Category): FormattedCategory => ({
  ...category,
  formattedCreatedAt: dayjs(category.createdAt).format(
    'DD/MM/YYYY [às] HH:mm:ss',
  ),
  formattedUpdatedAt: dayjs(category.updatedAt).format(
    'DD/MM/YYYY [às] HH:mm:ss',
  ),
});

export const priorityMapper = (priority: Priority): FormattedPriority => ({
  ...priority,
  formattedCreatedAt: dayjs(priority.createdAt).format(
    'DD/MM/YYYY [às] HH:mm:ss',
  ),
  formattedUpdatedAt: dayjs(priority.updatedAt).format(
    'DD/MM/YYYY [às] HH:mm:ss',
  ),
});

export const paymentMethodsMapper = (
  paymentMethods: PaymentMethods,
): FormattedPaymentMethods => ({
  ...paymentMethods,
  formattedCreatedAt: dayjs(paymentMethods.createdAt).format(
    'DD/MM/YYYY [às] HH:mm:ss',
  ),
  formattedUpdatedAt: dayjs(paymentMethods.updatedAt).format(
    'DD/MM/YYYY [às] HH:mm:ss',
  ),
});

export const yearMapper = (year: Year): FormattedYear => ({
  ...year,
  formattedCreatedAt: dayjs(year.createdAt).format('DD/MM/YYYY [às] HH:mm:ss'),
  formattedUpdatedAt: dayjs(year.updatedAt).format('DD/MM/YYYY [às] HH:mm:ss'),
});

export const monthMapper = (month: Month): FormattedMonth => ({
  ...month,
  formattedCreatedAt: dayjs(month.createdAt).format('DD/MM/YYYY [às] HH:mm:ss'),
  formattedUpdatedAt: dayjs(month.updatedAt).format('DD/MM/YYYY [às] HH:mm:ss'),
});
