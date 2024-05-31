import { Category, FormattedCategory } from '@/model/Category';
import { FormattedUsers, User } from '@/model/User';
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
