'use client';

import ErrorMessage from '@/components/ErrorMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';

import { TypeAccountsForm } from '@/model/TypeAccounts';
import { useAddTypeAccountsMutation } from '@/requests/mutations/typeAccounts';
import PaletteIcon from '@mui/icons-material/Palette';
import { ChromePicker } from 'react-color';
import * as S from './styles';

type TypeAccountsProps = { typeAccounts?: TypeAccountsForm };

type Schema = z.infer<typeof schema>;

const CreateTypeAccount = ({ typeAccounts }: TypeAccountsProps) => {
  const [loading, setLoading] = useState(false);
  const [bank_type, setBank_Type] = useState('');
  const [statePicker, setStatePicker] = useState(false);
  const [stateColor, setStateColor] = useState('#000000');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (event: SelectChangeEvent) => {
    setBank_Type(event.target.value as string);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Schema>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: typeAccounts,
  });

  const mutation = useAddTypeAccountsMutation();

  const handleSave: SubmitHandler<Schema> = useCallback(
    async (values: TypeAccountsForm) => {
      setLoading(true);
      setErrorMessage(null);
      try {
        await mutation.mutateAsync({
          ...values,
          bank_color: stateColor,
        });

        router.push('/type-accounts');
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
    [mutation, router, stateColor],
  );

  const handleBack = () => {
    router.back();
  };

  const handleOpenSetColor = () => {
    setStatePicker((prevState) => !prevState);
  };

  const handleSetColor = (color: any) => {
    setStateColor(color.hex);
    setValue('bank_color', color.hex);
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
        Criação de tipos de contas bancários
      </Typography>
      <form onSubmit={handleSubmit(handleSave)}>
        <S.WrapperInputs>
          <TextField
            id="bank_code"
            type="text"
            label="Código"
            {...register('bank_code')}
            aria-invalid={errors.bank_code ? true : false}
            helperText={
              <ErrorMessage>{errors.bank_code?.message}</ErrorMessage>
            }
            variant="filled"
            disabled={loading}
            required
            fullWidth
          />
          <TextField
            id="bank_name"
            type="text"
            label="Nome"
            {...register('bank_name')}
            aria-invalid={errors.bank_name ? true : false}
            helperText={
              <ErrorMessage>{errors.bank_name?.message}</ErrorMessage>
            }
            variant="filled"
            disabled={loading}
            required
            fullWidth
          />
          <FormControl fullWidth required variant="filled">
            <InputLabel id="bank_type">Tipo da conta</InputLabel>
            <Select
              labelId="bank_type"
              id="bank_type"
              label="Tipo da conta"
              {...register('bank_type')}
              aria-invalid={errors.bank_type ? true : false}
              value={bank_type}
              onChange={handleChange}
              variant="filled"
              required
            >
              <MenuItem value="Conta Corrente">Conta Corrente</MenuItem>
              <MenuItem value="Conta Poupança">Conta Poupança</MenuItem>
            </Select>
            <ErrorMessage>{errors.bank_type?.message}</ErrorMessage>
          </FormControl>

          <TextField
            id="bank_color"
            type="text"
            label="Cor"
            {...register('bank_color')}
            aria-invalid={errors.bank_color ? true : false}
            helperText={
              <ErrorMessage>{errors.bank_color?.message}</ErrorMessage>
            }
            value={stateColor}
            onChange={() => {}}
            variant="filled"
            disabled
            aria-readonly
            hidden
            required
            fullWidth
          />
        </S.WrapperInputs>
        <S.WrapperButtonColorPicker>
          <IconButton>
            <PaletteIcon
              onClick={handleOpenSetColor}
              style={{ color: stateColor }}
            />
          </IconButton>
        </S.WrapperButtonColorPicker>

        <S.WrapperColorPicker>
          {statePicker && (
            <ChromePicker
              color={stateColor}
              onChange={handleSetColor}
              onChangeComplete={handleSetColor}
              styles={{
                default: {
                  body: {
                    fontFamily: 'Poppins, sans-serif',
                  },
                  picker: {
                    width: '100%',
                  },
                },
              }}
            />
          )}
        </S.WrapperColorPicker>

        <S.WrapperCheckboxAndText>
          <FormControlLabel
            control={
              <Checkbox
                {...register('status')}
                defaultChecked={!!typeAccounts?.status ?? true}
              />
            }
            label="Status"
          />

          {errorMessage && (
            <Typography style={{ color: 'red' }}>{errorMessage}</Typography>
          )}
        </S.WrapperCheckboxAndText>

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

export default CreateTypeAccount;
