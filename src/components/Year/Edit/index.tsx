import ErrorMessage from '@/components/ErrorMessage';
import { YearForm } from '@/model/Year';
import { useAddYearMutation } from '@/requests/mutations/years';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';
import * as S from './styles';

type EditYearsProps = {
  handleClose?: () => void;
  handleSave?: (param: any) => void;
  years?: YearForm | any;
  id?: string;
};

type Schema = z.infer<typeof schema>;

const EditYearsModal = ({
  handleClose,
  handleSave,
  id,
  years,
}: EditYearsProps) => {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<YearForm>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: years,
  });

  React.useEffect(() => {
    if (years) {
      setValue('year', years.name);
      setValue('status', years.status);
    }
  }, [years, setValue]);

  const mutation = useAddYearMutation();
  const router = useRouter();

  const handleSaved: SubmitHandler<Schema> = useCallback(
    async (values: YearForm) => {
      setErrorMessage(null);
      try {
        const response = await mutation.mutateAsync({ ...values, id });
        handleSave && handleSave(values);
        handleClose && handleClose();
        if (response.status === 200) {
          router.refresh();
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 400) {
            setErrorMessage('Ano ja existente');
          } else {
            setErrorMessage('Algo deu errado!');
          }
        } else {
          setErrorMessage('Algo deu errado!');
        }
      } finally {
        router.refresh();
      }
    },
    [mutation, router],
  );

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
            Editar {years?.name}
          </Typography>
          <S.WrapperInputs>
            <TextField
              label="Nome"
              type="text"
              {...register('year')}
              variant="filled"
              helperText={<ErrorMessage>{errors.year?.message}</ErrorMessage>}
              inputProps={{ maxLength: 4 }}
              fullWidth
              required
            />
          </S.WrapperInputs>
          <FormControlLabel
            control={
              <Checkbox
                {...register('status')}
                defaultChecked={!!years?.status}
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

export default EditYearsModal;
