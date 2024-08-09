import { SituationForm } from '@/model/Situation';
import { useAddSituationMutation } from '@/requests/mutations/situation';
import { zodResolver } from '@hookform/resolvers/zod';
import PaletteIcon from '@mui/icons-material/Palette';
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';
import * as S from './styles';

type EditSituationProps = {
  handleClose?: () => void;
  handleSave?: (param: any) => void;
  situation?: SituationForm | any;
  id?: string;
};

type Schema = z.infer<typeof schema>;

const EditSituationModal = ({
  handleClose,
  situation,
  handleSave,
  id,
}: EditSituationProps) => {
  const [loading, setLoading] = useState(false);
  const [statePicker, setStatePicker] = useState(false);
  const [stateColor, setStateColor] = useState(situation.color);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SituationForm>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: situation,
  });

  useEffect(() => {
    if (situation) {
      setValue('name', situation.name);
      setValue('color', situation.color);
      setValue('status', situation.status);
    }
  }, [situation, setValue]);

  const mutation = useAddSituationMutation();
  const router = useRouter();

  const handleSaved: SubmitHandler<Schema> = async (values: SituationForm) => {
    setErrorMessage(null);
    try {
      setLoading(true);
      await mutation.mutateAsync({ ...values, id });
      handleSave && handleSave(values);
      handleClose && handleClose();
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          setErrorMessage('Situação já existente');
        } else {
          setErrorMessage('Algo deu errado!');
        }
      } else {
        setErrorMessage('Algo deu errado!');
      }
    } finally {
      router.refresh();
      setLoading(false);
    }
  };

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
    <Modal
      open={true}
      onClose={handleClose}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <S.Wrapper
        sx={{
          backgroundColor: 'background.paper',
        }}
      >
        <form onSubmit={handleSubmit(handleSaved)}>
          <Typography variant="h6" component="h2" color="primary" gutterBottom>
            Editar
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                {...register('status')}
                defaultChecked={!!situation?.status}
              />
            }
            label="Status"
          />
          <S.WrapperInputs>
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
                      width: '15rem',
                    },
                  },
                }}
              />
            )}
          </S.WrapperColorPicker>

          {errorMessage && (
            <Typography style={{ color: 'red' }}>{errorMessage}</Typography>
          )}

          <S.WrapperCTA>
            {loading && <CircularProgress />}
            {!loading && (
              <>
                <Button
                  type="button"
                  variant="outlined"
                  size="large"
                  color="inherit"
                  fullWidth
                  onClick={handleClose}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  color="primary"
                  fullWidth
                >
                  Salvar
                </Button>
              </>
            )}
          </S.WrapperCTA>
        </form>
      </S.Wrapper>
    </Modal>
  );
};

export default EditSituationModal;
