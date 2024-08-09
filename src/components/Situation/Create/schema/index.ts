import { z } from 'zod';

export const schema = z.object({
  name: z
    .string({ message: 'Nome obrigatório.' })
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(255, 'Nome deve ter no maúximo 255 caracteres'),
  color: z
    .string({ message: 'Nome obrigatório.' })
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(255, 'Nome deve ter no maúximo 255 caracteres'),
  status: z.boolean(),
});
