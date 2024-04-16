"use client";

import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();

  const handleSubmit = () => {
    router.push("/dashboard");
  };

  return (
    <Box
      sx={{
        marginTop: "5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Typography color="primary" variant="h3" className="font-bold">
        Login
      </Typography>
      <Card
        variant="elevation"
        sx={{
          padding: "5rem",
          width: "50rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
        }}
      >
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
      </Card>
    </Box>
  );
};

export default LoginForm;
