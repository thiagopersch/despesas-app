"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import * as S from "./styles";

const LoginForm = () => {
  const router = useRouter();

  const handleSubmit = () => {
    router.push("/dashboard");
  };

  return (
    <S.Wrapper>
      <Typography color="primary" variant="h3" className="font-bold">
        Login
      </Typography>
      <TextField
        type="email"
        name="login"
        label="E-mail"
        variant="filled"
        required
        autoComplete="on"
        fullWidth
      />
      <TextField
        type="password"
        name="password"
        label="Senha"
        variant="filled"
        required
        fullWidth
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="contained" onClick={handleSubmit}>
          Entrar
        </Button>
      </Box>
    </S.Wrapper>
  );
};

export default LoginForm;
