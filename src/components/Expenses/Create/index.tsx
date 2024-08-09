'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { schema } from '../schema';

import ErrorMessage from '@/components/ErrorMessage';
import { ExpensesForm } from '@/model/Expenses';
import { useAddExpensesMutation } from '@/requests/mutations/expenses';
import { listcategories } from '@/requests/queries/categories';
import { listMonth } from '@/requests/queries/month';
import { ListPaymentMethods } from '@/requests/queries/paymentMethods';
import { listPriorities } from '@/requests/queries/priorities';
import { listSituation } from '@/requests/queries/situation';
import { listTags } from '@/requests/queries/tags';
import { listTypeAccounts } from '@/requests/queries/typeAccounts';
import { listUsers } from '@/requests/queries/users';
import { ListYears } from '@/requests/queries/years';
import {
  Button,
  CircularProgress,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import * as S from './styles';

type ExpensesProps = { expenses?: ExpensesForm };

type Schema = z.infer<typeof schema>;

const CreateExpense = ({ expenses }: ExpensesProps) => {
  const [repeat, setRepeat] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [payDay, setPayDay] = useState<dayjs.Dayjs | null>();
  const [dueDate, setDueDate] = useState<dayjs.Dayjs | null>();

  const [situation, setSituation] = useState<string>('');
  const [user, setUser] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [priority, setPriority] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [type_account, setType_account] = useState<string>('');

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: expenses,
  });

  const { data: users } = useQuery({
    queryKey: ['get-users'],
    queryFn: () => listUsers(),
  });

  const { data: paymentMethods } = useQuery({
    queryKey: ['get-paymentMethods'],
    queryFn: () => ListPaymentMethods(),
  });

  const { data: priorities } = useQuery({
    queryKey: ['get-priority'],
    queryFn: () => listPriorities(),
  });

  const { data: categories } = useQuery({
    queryKey: ['get-category'],
    queryFn: () => listcategories(),
  });

  const { data: months } = useQuery({
    queryKey: ['get-month'],
    queryFn: () => listMonth(),
  });

  const { data: years } = useQuery({
    queryKey: ['get-year'],
    queryFn: () => ListYears(),
  });

  const { data: tags } = useQuery({
    queryKey: ['get-tags'],
    queryFn: () => listTags(),
  });

  const { data: type_accounts } = useQuery({
    queryKey: ['get-Type_account'],
    queryFn: () => listTypeAccounts(),
  });

  const { data: situations } = useQuery({
    queryKey: ['get-situation'],
    queryFn: () => listSituation(),
  });

  const mutation = useAddExpensesMutation();

  const handleUser = (event: SelectChangeEvent) => {
    setUser(event.target.value as string);
  };

  const handlePaymentMethod = (event: SelectChangeEvent) => {
    setPaymentMethod(event.target.value as string);
  };

  const handlePriority = (event: SelectChangeEvent) => {
    setPriority(event.target.value as string);
  };

  const handleCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const handleMonth = (event: SelectChangeEvent) => {
    setMonth(event.target.value as string);
  };

  const handleTag = (event: SelectChangeEvent) => {
    setTag(event.target.value as string);
  };

  const handleType_account = (event: SelectChangeEvent) => {
    setType_account(event.target.value as string);
  };

  const handleYears = (event: SelectChangeEvent) => {
    setYear(event.target.value as string);
  };

  const handleSituation = (event: SelectChangeEvent) => {
    setSituation(event.target.value as string);
  };

  const handlePaymentDateChange = (newValue: Dayjs | null) => {
    setPayDay(newValue);
  };

  const handleDueDateChange = (newValue: Dayjs | null) => {
    setDueDate(newValue);
  };

  const handleSaved: SubmitHandler<Schema> = useCallback(
    async (values: ExpensesForm) => {
      setErrorMessage(null);
      const response = await mutation.mutateAsync({ ...values });

      console.log(response);
    },
    [mutation, router],
  );

  const handleBack = () => {
    router.back();
  };

  const handleRepeat = () => {
    setRepeat(!repeat);
  };

  return (
    <S.Wrapper
      sx={{
        backgroundColor: 'background.paper',
      }}
    >
      <Typography
        variant="h4"
        color="primary"
        gutterBottom
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        Criação de despesas
      </Typography>
      <form onSubmit={handleSubmit(handleSaved)}>
        <S.WrapperInputs>
          <S.SectionOne>
            <TextField
              label="Nome"
              type="text"
              {...register('name')}
              variant="filled"
              helperText={errors.name?.message}
              disabled={isSubmitting}
              error={!!errors.name}
              fullWidth
              required
            />
          </S.SectionOne>
          <S.SectionTwo>
            <TextField
              label="Valor à pagar"
              type="number"
              {...register('amount_to_pay')}
              variant="filled"
              helperText={errors.amount_to_pay?.message}
              disabled={isSubmitting}
              error={!!errors.amount_to_pay}
              fullWidth
              required
            />
            <TextField
              label="Valor pago"
              type="number"
              {...register('amount_paid')}
              variant="filled"
              helperText={errors.amount_paid?.message}
              disabled={isSubmitting}
              error={!!errors.amount_paid}
              fullWidth
              required
            />
          </S.SectionTwo>
          <S.SectionThree>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="pt-br"
            >
              <DatePicker
                format="DD/MM/YYYY"
                {...register('pay_day')}
                value={payDay}
                onChange={handlePaymentDateChange}
                label="Data de pagamento"
                slotProps={{
                  textField: {
                    variant: 'filled',
                    fullWidth: true,
                    helperText: errors.pay_day?.message,
                    error: !!errors.pay_day,
                    disabled: isSubmitting,
                  },
                }}
              />
            </LocalizationProvider>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="pt-br"
            >
              <DatePicker
                format="DD/MM/YYYY"
                {...register('due_date')}
                value={dueDate}
                onChange={handleDueDateChange}
                label="Data de vencimento"
                slotProps={{
                  textField: {
                    variant: 'filled',
                    fullWidth: true,
                    helperText: errors.due_date?.message,
                    error: !!errors.due_date,
                    required: true,
                    disabled: isSubmitting,
                  },
                }}
              />
            </LocalizationProvider>
          </S.SectionThree>
          {/* <S.SectionSelects>
            <FormControl
              fullWidth
              required
              variant="filled"
              disabled={isSubmitting}
            >
              <InputLabel id="situations">Situação</InputLabel>
              <Select
                labelId="situations"
                id="situations"
                value={situation}
                label="Situações"
                {...register('situation_id')}
                onChange={handleSituation}
                variant="filled"
                error={!!errors.situation_id}
                disabled={isSubmitting}
                required
              >
                {situations?.map((item) => (
                  <MenuItem
                    key={item.id}
                    value={item.id}
                    sx={{ color: item.color }}
                  >
                    {item.name}
                  </MenuItem>
                ))}

                {!paymentMethods && (
                  <MenuItem
                    key="never"
                    value="never"
                    aria-readonly
                    sx={{ color: 'red' }}
                  >
                    Nenhum resultado encontrado...
                  </MenuItem>
                )}
              </Select>
            </FormControl>
            <FormControl fullWidth required variant="filled">
              <InputLabel id="users">Usuários</InputLabel>
              <Select
                labelId="users"
                id="users"
                value={user}
                label="Usuários"
                {...register('user_id')}
                onChange={handleUser}
                error={!!errors.user_id}
                variant="filled"
                required
              >
                {users?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </S.SectionSelects>
          <S.SectionSelects>
            <FormControl
              fullWidth
              required
              variant="filled"
              disabled={isSubmitting}
            >
              <InputLabel id="paymentMethod">Métodos de pagamento</InputLabel>
              <Select
                labelId="paymentMethod"
                id="paymentMethod"
                value={paymentMethod}
                label="Métodos de pagamento"
                {...register('payment_methods_id')}
                onChange={handlePaymentMethod}
                variant="filled"
                disabled={isSubmitting}
                error={!!errors.payment_methods_id}
                required
              >
                {paymentMethods?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}

                {!paymentMethods && (
                  <MenuItem
                    key="never"
                    value="never"
                    aria-readonly
                    sx={{ color: 'red' }}
                  >
                    Nenhum resultado encontrado...
                  </MenuItem>
                )}
              </Select>
            </FormControl>
            <FormControl fullWidth required variant="filled">
              <InputLabel id="priority">Prioridade</InputLabel>
              <Select
                labelId="priority"
                id="priority"
                value={priority}
                label="Prioridade"
                {...register('priority_id')}
                onChange={handlePriority}
                error={!!errors.priority_id}
                variant="filled"
                required
              >
                {priorities?.map((item) => (
                  <MenuItem key={item.id} value={item.id} aria-readonly>
                    {item.name}
                  </MenuItem>
                ))}

                {!priorities && (
                  <MenuItem
                    key="never"
                    value="never"
                    aria-readonly
                    sx={{ color: 'red' }}
                  >
                    Nenhum resultado encontrado...
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </S.SectionSelects>
          <S.SectionSelects>
            <FormControl
              fullWidth
              required
              variant="filled"
              disabled={isSubmitting}
            >
              <InputLabel id="month">Mês</InputLabel>
              <Select
                labelId="month"
                id="month"
                value={month}
                label="Mês"
                {...register('month_id')}
                onChange={handleMonth}
                variant="filled"
                disabled={isSubmitting}
                error={!!errors.month_id}
                required
                fullWidth
              >
                {months?.map((item) => (
                  <MenuItem key={item.id} value={item.id} aria-readonly>
                    {item.name}
                  </MenuItem>
                ))}

                {!months && (
                  <MenuItem
                    key="never"
                    value="never"
                    aria-readonly
                    sx={{ color: 'red' }}
                  >
                    Nenhum resultado encontrado...
                  </MenuItem>
                )}
              </Select>
            </FormControl>
            <FormControl
              fullWidth
              required
              variant="filled"
              disabled={isSubmitting}
            >
              <InputLabel id="year">Anos</InputLabel>
              <Select
                labelId="year"
                id="year"
                value={year}
                label="Anos"
                {...register('year_id')}
                onChange={handleYears}
                variant="filled"
                disabled={isSubmitting}
                error={!!errors.year_id}
                required
                fullWidth
              >
                {years?.map((item) => (
                  <MenuItem key={item.id} value={item.id} aria-readonly>
                    {item.year}
                  </MenuItem>
                ))}

                {!years && (
                  <MenuItem
                    key="never"
                    value="never"
                    aria-readonly
                    sx={{ color: 'red' }}
                  >
                    Nenhum resultado encontrado...
                  </MenuItem>
                )}
              </Select>
            </FormControl>
            <FormControl
              fullWidth
              required
              variant="filled"
              disabled={isSubmitting}
            >
              <InputLabel id="category">Categorias</InputLabel>
              <Select
                labelId="category"
                id="category"
                value={category}
                label="Categorias"
                {...register('category_id')}
                onChange={handleCategory}
                variant="filled"
                disabled={isSubmitting}
                error={!!errors.category_id}
                fullWidth
                required
              >
                {categories?.map((item) => (
                  <MenuItem key={item.id} value={item.id} aria-readonly>
                    {item.name}
                  </MenuItem>
                ))}

                {!categories && (
                  <MenuItem
                    key="never"
                    value="never"
                    aria-readonly
                    sx={{ color: 'red' }}
                  >
                    Nenhum resultado encontrado...
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </S.SectionSelects>
          <S.SectionSelects>
            <FormControl
              fullWidth
              required
              variant="filled"
              disabled={isSubmitting}
            >
              <InputLabel id="tag">Tags</InputLabel>
              <Select
                labelId="tag"
                id="tag"
                value={tag}
                label="Tags"
                {...register('tags_id')}
                onChange={handleTag}
                variant="filled"
                disabled={isSubmitting}
                error={!!errors.tags_id}
                fullWidth
                required
              >
                {tags?.map((item) => (
                  <MenuItem key={item.id} value={item.id} aria-readonly>
                    {item.name}
                  </MenuItem>
                ))}

                {!tags && (
                  <MenuItem
                    key="never"
                    value="never"
                    aria-readonly
                    sx={{ color: 'red' }}
                  >
                    Nenhum resultado encontrado...
                  </MenuItem>
                )}
              </Select>
            </FormControl>
            <FormControl
              fullWidth
              required
              variant="filled"
              disabled={isSubmitting}
            >
              <InputLabel id="type_account">Tipo de conta</InputLabel>
              <Select
                labelId="type_account"
                id="type_account"
                value={type_account}
                label="Tipo de conta"
                {...register('type_account_id')}
                onChange={handleType_account}
                variant="filled"
                disabled={isSubmitting}
                error={!!errors.type_account_id}
                fullWidth
                required
              >
                {type_accounts?.map((item) => (
                  <MenuItem
                    key={item.bank_code}
                    value={item.bank_code}
                    aria-readonly
                  >
                    {item.bank_name}
                  </MenuItem>
                ))}

                {!type_accounts && (
                  <MenuItem
                    key="never"
                    value="never"
                    aria-readonly
                    sx={{ color: 'red' }}
                  >
                    Nenhum resultado encontrado...
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </S.SectionSelects>
          <S.SectionCheckboxes>
            <FormControlLabel
              label="Despesa Fixa?"
              {...register('fixed_expense')}
              disabled={isSubmitting}
              control={<Checkbox />}
            />
            <FormControlLabel
              label="Repete?"
              {...register('repeat')}
              disabled={isSubmitting}
              control={<Checkbox />}
              onChange={handleRepeat}
            />
            {repeat && (
              <>
                <TextField
                  label="Quantidade de repetição"
                  type="number"
                  {...register('number_repeat')}
                  variant="filled"
                  helperText={errors.number_repeat?.message}
                  disabled={isSubmitting}
                  error={!!errors.number_repeat}
                  fullWidth
                  required
                />
                <TextField
                  label="Tipo de repetição"
                  type="text"
                  {...register('type_repeat')}
                  variant="filled"
                  helperText={errors.type_repeat?.message}
                  disabled={isSubmitting}
                  error={!!errors.type_repeat}
                  fullWidth
                  required
                />
              </>
            )}
          </S.SectionCheckboxes> */}
          <TextField
            label="Descricão"
            type="text"
            {...register('description')}
            variant="filled"
            helperText={errors.description?.message}
            disabled={isSubmitting}
            error={!!errors.description}
            multiline
            minRows={5}
            maxRows={5}
            fullWidth
          />
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </S.WrapperInputs>
        <S.WrapperCTA>
          {isSubmitting && <CircularProgress />}
          {!isSubmitting && (
            <>
              <Button
                type="reset"
                variant="outlined"
                size="large"
                color="inherit"
                disabled={isSubmitting}
                onClick={handleBack}
                fullWidth
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
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

export default CreateExpense;
