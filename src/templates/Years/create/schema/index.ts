import { z } from 'zod';

export const schema = z.object({
  year: z
    .string({
      message: 'Campo obrigatório.',
    })
    .min(1, { message: 'Campo obrigatório.' })
    .max(255, { message: 'Máximo de 255 caracteres.' }),
  status: z.boolean(),
});
