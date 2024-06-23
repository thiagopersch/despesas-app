import ErrorMessage from '@/components/ErrorMessage';
import { PaymentMethodsForm } from '@/model/PaymentMethods';
import { useAddPaymentMethodsMutation } from '@/requests/mutations/paymentMethods';
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

type EditPaymentMethodsProps = {
  handleClose?: () => void;
  handleSave?: (param: any) => void;
  paymentMethods?: PaymentMethodsForm | any;
  id?: string;
};

type Schema = z.infer<typeof schema>;

const EditPaymentMethodsModal = ({
  handleClose,
  handleSave,
  id,
  paymentMethods,
}: EditPaymentMethodsProps) => {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentMethodsForm>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: paymentMethods,
  });

  React.useEffect(() => {
    if (paymentMethods) {
      setValue('name', paymentMethods.name);
      setValue('status', paymentMethods.status);
    }
  }, [paymentMethods, setValue]);

  const mutation = useAddPaymentMethodsMutation();
  const router = useRouter();

  const handleSaved: SubmitHandler<Schema> = useCallback(
    async (values: PaymentMethodsForm) => {
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
            setErrorMessage('Já existe um registro na base com estes dados.');
          } else {
            setErrorMessage('Algo deu errado!');
          }
        } else {
          setErrorMessage('Algo deu errado!');
        }
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
            Editar {paymentMethods?.name}
          </Typography>
          <S.WrapperInputs>
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
                {...register('status')}
                defaultChecked={!!paymentMethods?.status}
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

export default EditPaymentMethodsModal;
