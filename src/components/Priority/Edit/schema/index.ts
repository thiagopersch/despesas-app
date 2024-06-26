import { z } from 'zod';

export const schema = z.object({
  name: z
    .string({ message: 'Campo obrigatório.' })
    .min(1, { message: 'Mínimo de 1 caracter.' })
    .max(255, { message: 'Máximo de 255 caracteres.' }),
  status: z.boolean(),
});
