'use client';

import ErrorMessage from '@/components/ErrorMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';

import { MonthForm } from '@/model/Month';
import { useAddMonthMutation } from '@/requests/mutations/month';
import { ListYears } from '@/requests/queries/years';
import { useQuery } from '@tanstack/react-query';
import * as S from './styles';

type MonthProps = { month?: MonthForm };

type Schema = z.infer<typeof schema>;

const CreateMonth = ({ month }: MonthProps) => {
  const [yearId, setYearId] = React.useState('');
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
      name: month?.name ?? '',
      status: month?.status ?? true,
    },
  });

  const { data: years } = useQuery({
    queryKey: ['get-year'],
    queryFn: () => ListYears(),
  });

  const mutation = useAddMonthMutation();

  const handleSave: SubmitHandler<Schema> = useCallback(
    async (values: MonthForm) => {
      setLoading(true);
      setErrorMessage(null);
      try {
        const response = await mutation.mutateAsync({ ...values });

        if (response.status === 201) {
          router.push('/month');
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

  const handleChange = (event: SelectChangeEvent) => {
    setYearId(event.target.value as string);
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
        Criação dos meses
      </Typography>
      <form onSubmit={handleSubmit(handleSave)}>
        <S.WrapperInputs>
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
        </S.WrapperInputs>

        <S.WrapperInputCheckboxAndText>
          <FormControlLabel
            control={
              <Checkbox
                {...register('status')}
                defaultChecked={!!month?.status ?? true}
              />
            }
            label="Status"
          />
          {errorMessage && (
            <Typography style={{ color: 'red' }}>{errorMessage}</Typography>
          )}
        </S.WrapperInputCheckboxAndText>

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

export default CreateMonth;
