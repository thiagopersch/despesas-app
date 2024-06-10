import ErrorMessage from '@/components/ErrorMessage';
import { CategoryForm } from '@/model/Category';
import { useAddCategoryMutation } from '@/requests/mutations/categories';
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
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from './schema';
import * as S from './styles';

type EditCategoryProps = {
  handleClose?: () => void;
  handleSave?: (param: any) => void;
  category?: CategoryForm | any;
  id?: string;
};

type Schema = z.infer<typeof schema>;

const EditCategoryModal = ({
  handleClose,
  category,
  handleSave,
  id,
}: EditCategoryProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryForm>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: category,
  });

  useEffect(() => {
    if (category) {
      setValue('name', category.name);
      setValue('status', category.status);
    }
  }, [category, setValue]);

  const mutation = useAddCategoryMutation();
  const router = useRouter();

  const handleSaved: SubmitHandler<Schema> = async (values: CategoryForm) => {
    setErrorMessage(null);
    try {
      await mutation.mutateAsync({ ...values, id });
      handleSave && handleSave(values);
      handleClose && handleClose();
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          setErrorMessage('Categoria já existente');
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
            Editar categoria
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
                defaultChecked={!!category?.status}
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

export default EditCategoryModal;
