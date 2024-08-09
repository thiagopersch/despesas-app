import ErrorMessage from '@/components/ErrorMessage';
import { ExpensesForm } from '@/model/Expenses';
import { useAddExpensesMutation } from '@/requests/mutations/expenses';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Modal, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { schema } from '../schema';
import * as S from './styles';

type EditExpensesProps = {
  handleClose?: () => void;
  handleSave?: (param: any) => void;
  expenses?: ExpensesForm | any;
  id?: string;
};

type Schema = z.infer<typeof schema>;

const EditExpensesModal = ({
  handleClose,
  expenses,
  handleSave,
  id,
}: EditExpensesProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { pending } = useFormStatus();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpensesForm>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: expenses,
  });

  useEffect(() => {
    if (expenses) {
      setValue('name', expenses.name);
      setValue('description', expenses.description);
      setValue('amount_to_pay', expenses.amount_to_pay);
      setValue('amount_paid', expenses.amount_paid);
      setValue('pay_day', expenses.pay_day);
      setValue('due_date', expenses.due_date);
      setValue('fixed_expense', expenses.fixed_expense);
      setValue('repeat', expenses.repeat);
      setValue('number_repeat', expenses.number_repeat);
      setValue('type_repeat', expenses.type_repeat);
      setValue('situation', expenses.situation);
      setValue('user_id', expenses.user_id);
      setValue('payment_methods_id', expenses.payment_methods_id);
      setValue('priority_id', expenses.priority_id);
      setValue('month_id', expenses.month_id);
      setValue('category_id', expenses.category_id);
      setValue('tags_id', expenses.tags_id);
      setValue('type_account_id', expenses.type_account_id);
    }
  }, [expenses, setValue]);

  const mutation = useAddExpensesMutation();
  const router = useRouter();

  const handleSaved: SubmitHandler<Schema> = async (values: ExpensesForm) => {
    setErrorMessage(null);
    try {
      await mutation.mutateAsync({ ...values, id });
      handleSave && handleSave(values);
      handleClose && handleClose();
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          setErrorMessage('Expenses já existente');
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
            Editar
          </Typography>
          <S.WrapperInputs>
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
            <TextField
              label="Descricão"
              type="text"
              {...register('description')}
              variant="filled"
              helperText={
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
              }
              disabled={pending}
              fullWidth
              required
            />
            <TextField
              label="Valor"
              type="number"
              {...register('amount_to_pay')}
              variant="filled"
              helperText={
                <ErrorMessage>{errors.amount_to_pay?.message}</ErrorMessage>
              }
            />
            <TextField
              label="Valor pago"
              type="number"
              {...register('amount_paid')}
              variant="filled"
              helperText={
                <ErrorMessage>{errors.amount_paid?.message}</ErrorMessage>
              }
            />
            <TextField
              label="Dia de pagamento"
              type="number"
              {...register('pay_day')}
              variant="filled"
              helperText={
                <ErrorMessage>{errors.pay_day?.message}</ErrorMessage>
              }
            />
            <TextField
              label="Vencimento"
              type="date"
              {...register('due_date')}
              variant="filled"
              helperText={
                <ErrorMessage>{errors.due_date?.message}</ErrorMessage>
              }
            />
            <TextField
              label="Fixa"
              type="checkbox"
              {...register('fixed_expense')}
              variant="filled"
              helperText={
                <ErrorMessage>{errors.fixed_expense?.message}</ErrorMessage>
              }
            />
            <TextField
              label="Repete?"
              type="checkbox"
              {...register('repeat')}
              variant="filled"
              helperText={<ErrorMessage>{errors.repeat?.message}</ErrorMessage>}
            />
            <TextField
              label="Quantidade de repetição"
              type="number"
              {...register('number_repeat')}
              variant="filled"
              helperText={
                <ErrorMessage>{errors.number_repeat?.message}</ErrorMessage>
              }
            />
            <TextField
              label="Tipo de repetição"
              type="text"
              {...register('type_repeat')}
              variant="filled"
              helperText={
                <ErrorMessage>{errors.type_repeat?.message}</ErrorMessage>
              }
            />
            <TextField
              label="Situação"
              type="text"
              {...register('situation')}
              variant="filled"
              helperText={
                <ErrorMessage>{errors.situation?.message}</ErrorMessage>
              }
            />
            <TextField
              label="Usuário"
              type="text"
              {...register('user_id')}
              variant="filled"
              helperText={
                <ErrorMessage>{errors.user_id?.message}</ErrorMessage>
              }
            />
            <TextField
              label="Forma de pagamento"
              type="text"
              {...register('payment_methods_id')}
              variant="filled"
              helperText={
                <ErrorMessage>
                  {errors.payment_methods_id?.message}
                </ErrorMessage>
              }
            />
            <TextField
              label="Prioridade"
              type="text"
              {...register('priority_id')}
              variant="filled"
              helperText={
                <ErrorMessage>{errors.priority_id?.message}</ErrorMessage>
              }
            />
            <TextField
              label="Mês"
              type="text"
              {...register('month_id')}
              variant="filled"
              helperText={
                <ErrorMessage>{errors.month_id?.message}</ErrorMessage>
              }
            />
            <TextField
              label="Categoria"
              type="text"
              {...register('category_id')}
              variant="filled"
              helperText={
                <ErrorMessage>{errors.category_id?.message}</ErrorMessage>
              }
            />
            <TextField
              label="Tags"
              type="text"
              {...register('tags_id')}
              variant="filled"
              helperText={
                <ErrorMessage>{errors.tags_id?.message}</ErrorMessage>
              }
            />
            <TextField
              label="Tipo de conta"
              type="text"
              {...register('type_account_id')}
              variant="filled"
              helperText={
                <ErrorMessage>{errors.type_account_id?.message}</ErrorMessage>
              }
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={pending}
            >
              {pending ? 'Salvando...' : 'Salvar'}
            </Button>
          </S.WrapperInputs>
        </form>
      </S.Wrapper>
    </Modal>
  );
};

export default EditExpensesModal;
