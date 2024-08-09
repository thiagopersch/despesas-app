import { z } from 'zod';

export const schema = z.object({
  name: z
    .string({
      required_error: 'Campo obrigatório.',
      message: 'Campo obrigatório.',
    })
    .min(3, { message: 'Campo obrigatório.' })
    .max(255, { message: 'Máximo de 255 caracteres.' }),
  description: z.string().max(255, { message: 'Máximo de 255 caracteres.' }),
  amount_to_pay: z
    .string({
      message: 'Campo obrigatório.',
    })
    .min(1, { message: 'Campo obrigatório.' })
    .max(255, { message: 'Máximo de 255 caracteres.' }),
  amount_paid: z
    .string({
      message: 'Campo obrigatório.',
    })
    .min(1, { message: 'Campo obrigatório.' })
    .max(255, { message: 'Máximo de 255 caracteres.' }),
  pay_day: z.string({ required_error: 'Campo obrigatório.' }),
  due_date: z.string(),
  /* fixed_expense: z
    .string({
      message: 'Campo obrigatório.',
    })
    .min(1, { message: 'Campo obrigatório.' }),
  repeat: z
    .string({
      message: 'Campo obrigatório.',
    })
    .min(1, { message: 'Campo obrigatório.' }),
  number_repeat: z
    .string({
      message: 'Campo obrigatório.',
    })
    .min(1, { message: 'Campo obrigatório.' }),
  type_repeat: z
    .string({
      message: 'Campo obrigatório.',
    })
    .min(1, { message: 'Campo obrigatório.' }),
  situation_id: z
    .string({
      message: 'Campo obrigatório.',
    })
    .min(1, { message: 'Campo obrigatório.' }),
  user_id: z
    .string({
      message: 'Campo obrigatório.',
    })
    .min(1, { message: 'Campo obrigatório.' }),
  payment_methods_id: z
    .string({
      message: 'Campo obrigatório.',
    })
    .min(1, { message: 'Campo obrigatório.' }),
  priority_id: z
    .string({
      message: 'Campo obrigatório.',
    })
    .min(1, { message: 'Campo obrigatório.' }),
  month_id: z
    .string({
      message: 'Campo obrigatório.',
    })
    .min(1, { message: 'Campo obrigatório.' }),
  year_id: z
    .string({
      message: 'Campo obrigatório.',
    })
    .min(1, { message: 'Campo obrigatório.' }),
  category_id: z
    .string({
      message: 'Campo obrigatório.',
    })
    .min(1, { message: 'Campo obrigatório.' }),
  tags_id: z
    .string({
      message: 'Campo obrigatório.',
    })
    .min(1, { message: 'Campo obrigatório.' }),
  type_account_id: z
    .string({
      message: 'Campo obrigatório.',
    })
    .min(1, { message: 'Campo obrigatório.' }), */
});
