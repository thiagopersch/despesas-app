"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { signIn } from "next-auth/react";
import { z } from "zod";
import ErrorMessage from "../ErrorMessage";
import { schema } from "./rules/schema";
import * as S from "./styles";

export type SigninFormData = {
  login: string;
  password: string;
};

type SchemaLogin = z.infer<typeof schema>;

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const router = useRouter();
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaLogin>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SchemaLogin> = useCallback(
    async (values: SigninFormData) => {
      setLoading(true);
      try {
        const result = await signIn("credentials", {
          login: values.login,
          password: values.password,
          redirect: false,
        });

        if (result?.error) {
          console.log(result);
          return;
        }
        console.log(result);
        router.push("/dashboard");
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    },
    [router],
  );

  return (
    <S.Wrapper>
      <Typography
        color="primary"
        variant="h3"
        sx={{
          textAlign: "center",
          margin: "1rem 0",
          fontWeight: "bold",
        }}
      >
        Faça seu login
      </Typography>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="email"
          label="E-mail"
          variant="filled"
          {...register("login")}
          helperText={<ErrorMessage>{errors.login?.message}</ErrorMessage>}
          required
          disabled={loading}
          fullWidth
        />
        <TextField
          type="password"
          {...register("password")}
          label="Senha"
          variant="filled"
          helperText={<ErrorMessage>{errors.password?.message}</ErrorMessage>}
          required
          disabled={loading}
          fullWidth
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </Box>
      </S.Form>
    </S.Wrapper>
  );
};

export default LoginForm;
