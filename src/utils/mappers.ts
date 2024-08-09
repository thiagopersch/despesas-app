import { Category, FormattedCategory } from '@/model/Category';
import { Expenses, FormattedExpenses } from '@/model/Expenses';
import { FormattedModules, Modules } from '@/model/Modules';
import { FormattedMonth, Month } from '@/model/Month';
import {
  FormattedPaymentMethods,
  PaymentMethods,
} from '@/model/PaymentMethods';
import { FormattedPriority, Priority } from '@/model/Priority';
import { FormattedProfiles, Profiles } from '@/model/Profiles';
import { FormattedSituation, Situation } from '@/model/Situation';
import { FormattedTags, Tags } from '@/model/Tags';
import { FormattedTypeAccounts, TypeAccounts } from '@/model/TypeAccounts';
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

export const tagsMapper = (tags: Tags): FormattedTags => ({
  ...tags,
  formattedCreatedAt: dayjs(tags.createdAt).format('DD/MM/YYYY [às] HH:mm:ss'),
  formattedUpdatedAt: dayjs(tags.updatedAt).format('DD/MM/YYYY [às] HH:mm:ss'),
});

export const typeAccountsMapper = (
  typeAccounts: TypeAccounts,
): FormattedTypeAccounts => ({
  ...typeAccounts,
  formattedCreatedAt: dayjs(typeAccounts.createdAt).format(
    'DD/MM/YYYY [às] HH:mm:ss',
  ),
  formattedUpdatedAt: dayjs(typeAccounts.updatedAt).format(
    'DD/MM/YYYY [às] HH:mm:ss',
  ),
});

export const modulesMapper = (modules: Modules): FormattedModules => ({
  ...modules,
  formattedCreatedAt: dayjs(modules.createdAt).format(
    'DD/MM/YYYY [às] HH:mm:ss',
  ),
  formattedUpdatedAt: dayjs(modules.updatedAt).format(
    'DD/MM/YYYY [às] HH:mm:ss',
  ),
});

export const profilesMapper = (profiles: Profiles): FormattedProfiles => ({
  ...profiles,
  formattedCreatedAt: dayjs(profiles.createdAt).format(
    'DD/MM/YYYY [às] HH:mm:ss',
  ),
  formattedUpdatedAt: dayjs(profiles.updatedAt).format(
    'DD/MM/YYYY [às] HH:mm:ss',
  ),
});

export const expensesMapper = (expenses: Expenses): FormattedExpenses => ({
  ...expenses,
  formattedCreatedAt: dayjs(expenses.createdAt).format(
    'DD/MM/YYYY [às] HH:mm:ss',
  ),
  formattedUpdatedAt: dayjs(expenses.updatedAt).format(
    'DD/MM/YYYY [às] HH:mm:ss',
  ),
});

export const situationMapper = (situation: Situation): FormattedSituation => ({
  ...situation,
  formattedCreatedAt: dayjs(situation.createdAt).format(
    'DD/MM/YYYY [às] HH:mm:ss',
  ),
  formattedUpdatedAt: dayjs(situation.updatedAt).format(
    'DD/MM/YYYY [às] HH:mm:ss',
  ),
});
