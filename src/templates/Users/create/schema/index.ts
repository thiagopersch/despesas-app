import { z } from "zod";

export const createUserFormSchema = z.object({
  name: z
    .string({ message: "Campo obrigatório." })
    .min(1, { message: "Mínimo de 1 caracter." })
    .max(255, { message: "Máximo de 255 caracteres." }),
  login: z
    .string({ message: "Campo obrigatório." })
    .email({ message: "Não é um e-mail." }),
  password: z
    .string({ message: "Campo obrigatório." })
    .min(8, { message: "Minimo 8 caracteres." })
    .max(32, { message: "Máximo de 32 caracteres." }),
});
