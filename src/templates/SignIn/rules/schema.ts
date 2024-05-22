import { z } from 'zod';

export const schema = z.object({
  login: z
    .string({ message: 'Campo obrigatório.' })
    .min(1, { message: 'Campo obrigatório.' })
    .email({ message: 'Não é um e-mail.' }),
  password: z
    .string({ message: 'Campo obrigatório.' })
    .min(8, { message: 'Minimo 8 caracteres.' })
    .max(32, { message: 'Máximo de 32 caracteres.' }),
});
