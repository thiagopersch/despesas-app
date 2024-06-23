'use client';

import ErrorMessage from '@/components/ErrorMessage';
import { PaymentMethodsForm } from '@/model/PaymentMethods';
import { useAddPaymentMethodsMutation } from '@/requests/mutations/paymentMethods';
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
import React, { useCallback } from 'react';
import { useFormStatus } from 'react-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';
import * as S from './styles';

type PaymentMethodsProps = { paymentMethod?: PaymentMethodsForm };

type Schema = z.infer<typeof schema>;

const CreatePaymentMethods = ({ paymentMethod }: PaymentMethodsProps) => {
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
    defaultValues: paymentMethod,
  });

  const mutation = useAddPaymentMethodsMutation();

  const handleSave: SubmitHandler<Schema> = useCallback(
    async (values: PaymentMethodsForm) => {
      try {
        setLoading(pending);
        setErrorMessage(null);
        const response = await mutation.mutateAsync({ ...values });
        if (response.status === 201) router.push('/paymentMethods');
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 400) {
            setErrorMessage('Já existe um registro com estes dados.');
          } else {
            setErrorMessage('Ocorreu algum erro ao tentar criar registro.');
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
        Criação de métodos de pagamento
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
                defaultChecked={!!paymentMethod?.status ?? true}
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

export default CreatePaymentMethods;
