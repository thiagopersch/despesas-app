'use client';

import ErrorMessage from '@/components/ErrorMessage';
import { useAddUserMutation } from '@/requests/mutations/users';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';

import * as S from './styles';

type CreateUserProps = {
  name: string;
  login: string;
  password: string;
};

type SchemaSignIn = z.infer<typeof schema>;

export default function CreateUser() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaSignIn>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      login: '',
      password: '',
    },
  });
  const router = useRouter();

  const mutation = useAddUserMutation();

  const handleSave: SubmitHandler<SchemaSignIn> = useCallback(
    async (values: CreateUserProps) => {
      setLoading(true);
      setErrorMessage(null);
      try {
        const response = await mutation.mutateAsync(values);

        if (response.status === 201) {
          setSuccess(true);
          router.push('/users');
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 400) {
            setErrorMessage('Já existe um usuário com estes dados.');
          } else {
            setErrorMessage('Ocorreu algum erro ao tentar criar o usuário.');
          }
        } else {
          setErrorMessage('Ocorreu um erro inesperado.');
        }
      } finally {
        setLoading(false);
      }
    },
    [mutation, router],
  );

  const handleBack = () => {
    router.back();
  };

  return (
    <S.Wrapper>
      <Typography
        variant="h4"
        color="primary"
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          marginBottom: '1rem',
        }}
      >
        Criação de usuários
      </Typography>
      <form onSubmit={handleSubmit(handleSave)}>
        <S.WrapperInputs>
          <TextField
            id="name"
            type="text"
            label="Nome"
            {...register('name')}
            aria-invalid={errors.login ? true : false}
            helperText={<ErrorMessage>{errors.name?.message}</ErrorMessage>}
            variant="filled"
            disabled={loading}
            required
            fullWidth
            autoFocus
          />

          <TextField
            id="login"
            type="text"
            label="Login"
            {...register('login')}
            aria-invalid={errors.login ? true : false}
            helperText={<ErrorMessage>{errors.login?.message}</ErrorMessage>}
            variant="filled"
            disabled={loading}
            required
            fullWidth
          />

          <TextField
            id="password"
            type="text"
            label="Senha"
            {...register('password')}
            aria-invalid={errors.password ? true : false}
            helperText={<ErrorMessage>{errors.password?.message}</ErrorMessage>}
            variant="filled"
            disabled={loading}
            required
            fullWidth
          />
          {errorMessage && (
            <Typography style={{ color: 'red' }}>{errorMessage}</Typography>
          )}
        </S.WrapperInputs>

        <S.WrapperCTA>
          {loading && <CircularProgress />}
          {!loading && (
            <>
              <Button
                type="reset"
                variant="outlined"
                size="large"
                color="inherit"
                onClick={handleBack}
                fullWidth
              >
                Cancelar
              </Button>
              <Button type="submit" variant="contained" size="large" fullWidth>
                Cadastrar
              </Button>
            </>
          )}
        </S.WrapperCTA>
      </form>
    </S.Wrapper>
  );
}
