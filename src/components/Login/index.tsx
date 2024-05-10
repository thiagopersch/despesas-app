"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";
import { SyntheticEvent, useState } from "react";
import * as S from "./styles";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.log(result);
      return;
    }
    router.push("/dashboard");
  };

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
        Login
      </Typography>
      <S.Form onSubmit={handleSubmit}>
        <TextField
          type="email"
          name="login"
          label="E-mail"
          variant="filled"
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <TextField
          type="password"
          name="password"
          label="Senha"
          variant="filled"
          onChange={(e) => setPassword(e.target.value)}
          required
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
          <Button type="submit" variant="contained" size="large" fullWidth>
            Entrar
          </Button>
        </Box>
      </S.Form>
    </S.Wrapper>
  );
};

export default LoginForm;
