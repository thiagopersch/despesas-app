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

import { CategoryForm } from '@/model/Category';
import { useAddCategoryMutation } from '@/requests/mutations/categories';
import * as S from './styles';

type CategoryProps = { category?: CategoryForm };

type Schema = z.infer<typeof schema>;

const CreateCategory = ({ category }: CategoryProps) => {
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
      name: category?.name ?? '',
      status: category?.status ?? true,
    },
  });

  const mutation = useAddCategoryMutation();

  const handleSave: SubmitHandler<Schema> = useCallback(
    async (values: CategoryForm) => {
      setLoading(true);
      setErrorMessage(null);
      try {
        const response = await mutation.mutateAsync({ ...values });

        if (response.status === 201) {
          router.push('/category');
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 400) {
            setErrorMessage('Já existe uma categoria com estes dados.');
          } else {
            setErrorMessage('Ocorreu algum erro ao tentar criar a categoria.');
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
        Criação de categorias
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

          <FormControlLabel
            control={
              <Checkbox
                {...register('status')}
                defaultChecked={!!category?.status ?? true}
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

export default CreateCategory;
