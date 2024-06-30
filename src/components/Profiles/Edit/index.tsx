import ErrorMessage from '@/components/ErrorMessage';
import { ProfilesForm } from '@/model/Profiles';
import { useAddProfilesMutation } from '@/requests/mutations/profiles';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';
import * as S from './styles';

type EditProfilesProps = {
  handleClose?: () => void;
  handleSave?: (param: any) => void;
  profiles?: ProfilesForm | any;
  id?: string;
};

type Schema = z.infer<typeof schema>;

const EditProfilesModal = ({
  handleClose,
  profiles,
  handleSave,
  id,
}: EditProfilesProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { pending } = useFormStatus();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfilesForm>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: profiles,
  });

  useEffect(() => {
    if (profiles) {
      setValue('name', profiles.name);
      setValue('code', profiles.code);
      setValue('status', profiles.status);
    }
  }, [profiles, setValue]);

  const mutation = useAddProfilesMutation();
  const router = useRouter();

  const handleSaved: SubmitHandler<Schema> = async (values: ProfilesForm) => {
    setErrorMessage(null);
    try {
      await mutation.mutateAsync({ ...values, id });
      handleSave && handleSave(values);
      handleClose && handleClose();
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          setErrorMessage('Profiles já existente');
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

  const handleBack = () => {
    router.back();
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
                defaultChecked={!!profiles?.status}
              />
            }
            label="Status"
          />
          <S.WrapperInputs>
            <TextField
              label="Código"
              type="text"
              {...register('code')}
              variant="filled"
              helperText={<ErrorMessage>{errors.code?.message}</ErrorMessage>}
              disabled={pending}
              fullWidth
              required
            />
            <TextField
              label="Nome"
              type="text"
              {...register('name')}
              variant="filled"
              helperText={<ErrorMessage>{errors.name?.message}</ErrorMessage>}
              disabled={pending}
              fullWidth
              required
            />
          </S.WrapperInputs>

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

export default EditProfilesModal;
