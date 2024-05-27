import ErrorMessage from '@/components/ErrorMessage';
import { UserFormEdit } from '@/model/User';
import { useAddUserMutation } from '@/requests/mutations/users';
import { zodResolver } from '@hookform/resolvers/zod';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';
import * as S from './styles';

type EditUserModalProps = {
  handleClose?: () => void;
  handleSave?: (param: any) => void;
  user?: UserFormEdit | any;
  id?: string;
};

type SchemaSignIn = z.infer<typeof schema>;

const EditUserModal = ({
  handleClose,
  user,
  handleSave,
  id,
}: EditUserModalProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormEdit>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: user,
  });

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('login', user.login);
      setValue('change_password', user.change_password);
      setValue('status', user.status);
    }
  }, [user, setValue]);

  const mutation = useAddUserMutation();
  const router = useRouter();

  const handleSaved: SubmitHandler<SchemaSignIn> = async (
    values: UserFormEdit,
  ) => {
    try {
      await mutation.mutateAsync({ ...values, id });
      handleSave && handleSave(values);
      handleClose && handleClose();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          setErrorMessage('Usuário ja existente');
        } else {
          setErrorMessage('Algo deu errado!');
        }
      } else {
        setErrorMessage('Algo deu errado!');
      }
    } finally {
      router.refresh;
    }
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
            Editar Usuário
          </Typography>
          <S.WrapperInputs>
            <Grid container whiteSpace="pre-wrap">
              <Grid item xs={11}>
                <TextField
                  label="Login"
                  type="email"
                  variant="filled"
                  {...register('login')}
                  helperText={
                    <ErrorMessage>{errors.login?.message}</ErrorMessage>
                  }
                  aria-readonly={true}
                  disabled={true}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={1}>
                <Tooltip title="Valor não pode ser alterado">
                  <IconButton>
                    <GppMaybeIcon color="warning" fontSize="large" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <TextField
              label="Nome"
              type="text"
              {...register('name')}
              variant="filled"
              helperText={<ErrorMessage>{errors.name?.message}</ErrorMessage>}
              fullWidth
              required
            />
          </S.WrapperInputs>
          <FormControlLabel
            control={
              <Checkbox
                {...register('change_password')}
                defaultChecked={!!user?.change_password}
              />
            }
            label="Trocar senha no próximo login?"
          />
          <FormControlLabel
            control={
              <Checkbox
                {...register('status')}
                defaultChecked={!!user?.status}
              />
            }
            label="Status"
          />
          {errorMessage && (
            <Typography style={{ color: 'red' }}>{errorMessage}</Typography>
          )}

          <Box sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              fullWidth
            >
              Salvar
            </Button>
          </Box>
        </form>
      </S.Wrapper>
    </Modal>
  );
};

export default EditUserModal;
