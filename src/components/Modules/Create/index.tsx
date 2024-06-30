'use client';

import ErrorMessage from '@/components/ErrorMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';

import { ModulesForm } from '@/model/Modules';
import { useAddModulesMutation } from '@/requests/mutations/modules';
import * as S from './styles';

type ModulesProps = { modules?: ModulesForm };

type Schema = z.infer<typeof schema>;

const CreateModule = ({ modules }: ModulesProps) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      name: modules?.name ?? '',
      status: modules?.status ?? true,
    },
  });

  const mutation = useAddModulesMutation();

  const handleSave: SubmitHandler<Schema> = useCallback(
    async (values: ModulesForm) => {
      setLoading(true);
      setErrorMessage(null);
      try {
        const response = await mutation.mutateAsync({ ...values });

        if (response.status === 201) {
          router.push('/modules');
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 400) {
            setErrorMessage('Já existe um registro com estes dados.');
          } else {
            setErrorMessage('Ocorreu algum erro ao tentar criar o registro.');
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
        Criação de módulos
      </Typography>
      <form onSubmit={handleSubmit(handleSave)}>
        <S.WrapperInputs>
          <TextField
            id="code"
            type="text"
            label="Código"
            {...register('code')}
            aria-invalid={errors.code ? true : false}
            helperText={<ErrorMessage>{errors.code?.message}</ErrorMessage>}
            variant="filled"
            disabled={loading}
            required
            fullWidth
          />
          <TextField
            id="name"
            type="text"
            label="Nome"
            {...register('name')}
            aria-invalid={errors.name ? true : false}
            helperText={<ErrorMessage>{errors.name?.message}</ErrorMessage>}
            variant="filled"
            disabled={loading}
            required
            fullWidth
          />

          <FormControlLabel
            control={
              <Checkbox
                {...register('status')}
                defaultChecked={!!modules?.status ?? true}
              />
            }
            label="Status"
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
};

export default CreateModule;
