import ErrorMessage from '@/components/ErrorMessage';
import { TypeAccountsForm } from '@/model/TypeAccounts';
import { useAddTypeAccountsMutation } from '@/requests/mutations/typeAccounts';
import { zodResolver } from '@hookform/resolvers/zod';
import PaletteIcon from '@mui/icons-material/Palette';
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import { useFormStatus } from 'react-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';
import * as S from './styles';

type EditTypeAccountsProps = {
  handleClose?: () => void;
  handleSave?: (param: any) => void;
  typeAccounts?: TypeAccountsForm | any;
  id?: string;
};

type Schema = z.infer<typeof schema>;

const EditTypeAccountsModal = ({
  handleClose,
  typeAccounts,
  handleSave,
  id,
}: EditTypeAccountsProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statePicker, setStatePicker] = useState(false);
  const [stateColor, setStateColor] = useState<string>(typeAccounts.bank_color);
  const { pending } = useFormStatus();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeAccountsForm>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: typeAccounts,
  });

  useEffect(() => {
    if (typeAccounts) {
      setValue('bank_code', typeAccounts.bank_code);
      setValue('bank_name', typeAccounts.bank_name);
      setValue('bank_color', typeAccounts.bank_color);
      setValue('bank_type', typeAccounts.bank_type);
      setValue('status', typeAccounts.status);
    }
  }, [typeAccounts, setValue]);

  const mutation = useAddTypeAccountsMutation();
  const router = useRouter();

  const handleSaved: SubmitHandler<Schema> = async (
    values: TypeAccountsForm,
  ) => {
    setErrorMessage(null);
    try {
      await mutation.mutateAsync({ ...values, bank_color: stateColor, id });
      handleSave && handleSave(values);
      handleClose && handleClose();
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          setErrorMessage('Esta conta já existente');
        } else {
          setErrorMessage('Algo deu errado!');
        }
      } else {
        setErrorMessage('Algo deu errado!');
      }
    } finally {
      router.refresh();
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setValue('bank_type', event.target.value as string);
  };

  const handleOpenSetColor = () => {
    setStatePicker((prevState) => !prevState);
  };

  const handleSetColor = (color: any) => {
    setStateColor(color.hex);
    setValue('bank_color', color.hex);
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
                defaultChecked={!!typeAccounts?.status}
              />
            }
            label="Status"
          />
          <S.WrapperInputs>
            <TextField
              label="bank_code"
              type="text"
              {...register('bank_code')}
              variant="filled"
              helperText={
                <ErrorMessage>{errors.bank_code?.message}</ErrorMessage>
              }
              disabled={pending}
              fullWidth
              required
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
              disabled={pending}
              required
              fullWidth
            />
          </S.WrapperInputs>
          <S.WrapperInputsTwo>
            <FormControl fullWidth required variant="filled">
              <InputLabel id="bank_type" filled>
                Tipo da conta
              </InputLabel>
              <Select
                labelId="bank_type"
                id="bank_type"
                label="Tipo da conta"
                {...register('bank_type')}
                aria-invalid={errors.bank_type ? true : false}
                value={typeAccounts.bank_type}
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
            <S.WrapperColorPicker>
              <S.WrapperButtonColorPicker>
                <IconButton>
                  <PaletteIcon
                    onClick={handleOpenSetColor}
                    style={{ color: stateColor }}
                  />
                </IconButton>
              </S.WrapperButtonColorPicker>
              <S.ColorPicker>
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
              </S.ColorPicker>
            </S.WrapperColorPicker>
          </S.WrapperInputsTwo>

          {errorMessage && (
            <Typography style={{ color: 'red' }}>{errorMessage}</Typography>
          )}

          <S.WrapperCTA>
            {pending && <CircularProgress />}
            {!pending && (
              <>
                <Button
                  onClick={handleClose}
                  variant="text"
                  size="large"
                  color="inherit"
                  fullWidth
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

export default EditTypeAccountsModal;
