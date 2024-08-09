'use client';

import ErrorMessage from '@/components/ErrorMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './rules/schema';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { signIn } from 'next-auth/react';
import * as S from './styles';

export type SigninFormData = {
  login: string;
  password: string;
};

type SchemaSignIn = z.infer<typeof schema>;

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
          router.push('/');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [router],
  );

  const handleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

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
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          label="Senha"
          variant="filled"
          helperText={<ErrorMessage>{errors.password?.message}</ErrorMessage>}
          required
          disabled={loading}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  aria-label="Visualizar senha"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
