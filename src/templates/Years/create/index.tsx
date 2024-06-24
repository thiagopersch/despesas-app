'use client';

import { YearForm } from '@/model/Year';
import { useAddYearMutation } from '@/requests/mutations/years';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import { useFormStatus } from 'react-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';

import ErrorMessage from '@/components/ErrorMessage';
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import * as S from './styles';

type YearProps = { year?: YearForm };

type Schema = z.infer<typeof schema>;

const CreateYear = ({ year }: YearProps) => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const router = useRouter();
  const { pending } = useFormStatus();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: year,
  });

  const mutation = useAddYearMutation();

  const handleSave: SubmitHandler<Schema> = useCallback(
    async (values: YearForm) => {
      try {
        setLoading(pending);
        setErrorMessage(null);
        const response = await mutation.mutateAsync({ ...values });
        if (response.status === 201) router.push('/years');
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 400) {
            setErrorMessage('Já existe um registro com estes dados.');
          } else {
            setErrorMessage('Ocorreu algum erro ao tentar criar registro.');
          }
        }
      } finally {
        setLoading(false);
      }
    },
    [mutation, router, pending],
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
        Criação dos anos
      </Typography>
      <form onSubmit={handleSubmit(handleSave)}>
        <S.WrapperInputs>
          <TextField
            id="year"
            type="text"
            label="Ano"
            {...register('year')}
            aria-invalid={errors.year ? true : false}
            helperText={<ErrorMessage>{errors.year?.message}</ErrorMessage>}
            inputProps={{ maxLength: 4 }}
            variant="filled"
            disabled={loading}
            required
            fullWidth
          />

          <FormControlLabel
            control={
              <Checkbox
                {...register('status')}
                defaultChecked={!!year?.status ?? true}
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

export default CreateYear;
