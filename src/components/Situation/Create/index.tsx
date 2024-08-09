'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';

import { SituationForm } from '@/model/Situation';
import { useAddSituationMutation } from '@/requests/mutations/situation';
import PaletteIcon from '@mui/icons-material/Palette';
import { ChromePicker } from 'react-color';
import * as S from './styles';

type SituationProps = { situation?: SituationForm };

type Schema = z.infer<typeof schema>;

const CreateSituation = ({ situation }: SituationProps) => {
  const [loading, setLoading] = useState(false);
  const [statePicker, setStatePicker] = useState(false);
  const [stateColor, setStateColor] = useState('#000000');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Schema>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: situation,
  });

  const mutation = useAddSituationMutation();

  const handleSave: SubmitHandler<Schema> = useCallback(
    async (values: SituationForm) => {
      setLoading(true);
      setErrorMessage(null);
      try {
        const response = await mutation.mutateAsync({ ...values });

        if (response.status === 201) {
          router.push('/situation');
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

  const handleOpenSetColor = () => {
    setStatePicker((prevState) => !prevState);
  };

  const handleSetColor = (color: any) => {
    setStateColor(color.hex);
    setValue('color', color.hex);
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
        Cadastrar Situação
      </Typography>
      <form onSubmit={handleSubmit(handleSave)}>
        <S.WrapperInputs>
          <FormControlLabel
            control={
              <Checkbox
                {...register('status')}
                defaultChecked
                color="primary"
              />
            }
            label="Ativa"
          />
          <TextField
            {...register('name')}
            id="name"
            type="text"
            label="Nome"
            variant="filled"
            disabled={loading}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
            required
          />
          <TextField
            {...register('color')}
            id="color"
            type="text"
            label="Cor"
            variant="filled"
            disabled={loading}
            value={stateColor}
            onChange={() => {}}
            error={!!errors.color}
            helperText={errors.color?.message}
            fullWidth
            hidden
          />
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
          {errorMessage && (
            <Typography style={{ color: 'red' }}>{errorMessage}</Typography>
          )}
        </S.WrapperInputs>
        <S.WrapperCTA>
          {loading && <CircularProgress />}
          {!loading && (
            <>
              <Button
                type="button"
                variant="outlined"
                color="inherit"
                fullWidth
                disabled={loading}
                onClick={handleBack}
              >
                Voltar
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                fullWidth
              >
                Cadastrar
              </Button>
            </>
          )}
        </S.WrapperCTA>
      </form>
    </S.Wrapper>
  );
};

export default CreateSituation;
