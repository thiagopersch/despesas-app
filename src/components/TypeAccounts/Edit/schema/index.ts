import { z } from 'zod';

export const schema = z.object({
  bank_code: z
    .string({ message: 'Campo obrigatório.' })
    .min(1, { message: 'Campo obrigatório.' })
    .max(255, { message: 'Máximo de 255 caracteres.' }),
  bank_name: z
    .string({ message: 'Campo obrigatório.' })
    .min(1, { message: 'Campo obrigatório.' })
    .max(255, { message: 'Máximo de 255 caracteres.' }),
  bank_type: z
    .string({ message: 'Campo obrigatório.' })
    .min(1, { message: 'Campo obrigatório.' })
    .max(255, { message: 'Máximo de 255 caracteres.' }),
  bank_color: z
    .string({ message: 'Campo obrigatório.' })
    .min(1, { message: 'Campo obrigatório.' })
    .max(255, { message: 'Máximo de 255 caracteres.' }),
  status: z.boolean(),
});
