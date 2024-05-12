"use client";

import { ModalCustomizedProps } from "@/components/Modal";
import { User } from "@/model/User";
import { useAddUserMutation } from "@/requests/mutations/users";
import Base from "@/templates/Base";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useCallback, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type CreateUserProps = {
  name: string;
  login: string;
  password: string;
};

const CreateUser = () => {
  const [user, setUser] = useState<User>();
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserProps>({
    defaultValues: {
      login: user?.login,
      name: user?.name,
      password: "12345678",
    },
  });
  const [status, setStatus] = useState(true);
  const [saving, setSaving] = useState(false);

  const modalRef = useRef<ModalCustomizedProps>(null);

  const { data: session } = useSession();
  const mutation = useAddUserMutation(modalRef, session);

  const onSubmit: SubmitHandler<CreateUserProps> = useCallback(
    async (values: CreateUserProps) => {
      setSaving(true);

      await mutation.mutateAsync({
        id: user?.id,
        login: values.login,
        name: values.name,
        password: values.password,
      });

      // refetchFn && refetchFn();

      setSaving(false);
    },
    [mutation, user, status, session],
  );

  return (
    <Base>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "5rem 30rem",
        }}
      >
        <Typography
          variant="h4"
          color="primary"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Criação de usuários
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            margin: "0 30rem",
          }}
        >
          <Controller
            name="name"
            control={control}
            defaultValue={user?.name ?? ""}
            render={({ field }) => (
              <TextField
                id="nameUser"
                type="text"
                label="Nome"
                {...field}
                variant="filled"
                required
                fullWidth
              />
            )}
          />

          <TextField
            id="nameUser"
            type="text"
            label="Nome"
            {...register("login")}
            aria-invalid={errors.login ? "true" : "false"}
            variant="filled"
            required
            fullWidth
          />

          {/* <TextField
            type="text"
            label="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            variant="filled"
            required
            fullWidth
          /> */}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            margin: "2rem 30rem",
          }}
        >
          <Button type="submit" variant="contained" size="large">
            Cadastrar
          </Button>
        </Box>
      </form>
    </Base>
  );
};
export default CreateUser;
