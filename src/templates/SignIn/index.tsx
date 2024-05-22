'use client';

import ErrorMessage from '@/components/ErrorMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography } from '@mui/material';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './rules/schema';

import { signIn } from 'next-auth/react';
import * as S from './styles';

export type SigninFormData = {
  login: string;
  password: string;
};

type SchemaSignIn = z.infer<typeof schema>;

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<number>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaSignIn>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<SchemaSignIn> = useCallback(
    async (values: SigninFormData) => {
      setLoading(true);
      try {
        const result = await signIn('credentials', {
          redirect: false,
          login: values.login,
          password: values.password,
        });
        if (result?.error) {
          setError(result?.status);
        } else {
          router.push('/dashboard');
        }
      } catch (err) {
        console.error(err);
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
          textAlign: 'center',
          margin: '1rem 0',
          fontWeight: 'bold',
        }}
      >
        Faça seu login
      </Typography>

      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="email"
          label="E-mail"
          variant="filled"
          {...register('login')}
          helperText={<ErrorMessage>{errors.login?.message}</ErrorMessage>}
          required
          disabled={loading}
          fullWidth
        />
        <TextField
          type="password"
          {...register('password')}
          label="Senha"
          variant="filled"
          helperText={<ErrorMessage>{errors.password?.message}</ErrorMessage>}
          required
          disabled={loading}
          fullWidth
        />
        {error === 401 && (
          <Typography color="error" sx={{ textAlign: 'center' }}>
            Credenciais inválidas
          </Typography>
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </Box>
      </S.Form>
    </S.Wrapper>
  );
}
