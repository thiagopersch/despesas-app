import ToastContent from '@/components/ToastContent';
import { Expenses, ExpensesForm } from '@/model/Expenses';

import createApi from '@/services/api';
import useMutation from '@/services/useMutation';
import { Session } from 'next-auth';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function useAddExpensesMutation(session?: Session | null) {
  const addExpenses = useCallback(
    async (values: ExpensesForm) => {
      const api = createApi(session);
      const requestData = { ...values, id: values.id ? values.id : undefined };

      if (!requestData.id) {
        return api.post('/expenses/', requestData);
      } else {
        return api.patch(`/expenses/${requestData.id}`, requestData);
      }
    },
    [session],
  );

  return useMutation('add-expenses', addExpenses, {
    linkedQueries: {
      'get-expenses': (
        old: { expenses: ExpensesForm[] } | undefined,
        newExpenses: ExpensesForm,
      ) => {
        if (!old || !old.expenses) {
          return [{ ...newExpenses, id: uuidv4(), disabled: true }];
        }

        const existingExpensesIndex = old.expenses.findIndex(
          (expenses) => expenses.id === newExpenses.id,
        );

        if (existingExpensesIndex > -1) {
          const updateExpenses = [...old.expenses];
          updateExpenses[existingExpensesIndex] = {
            ...newExpenses,
            id: old.expenses[existingExpensesIndex].id,
          };
          return { expenses: updateExpenses };
        } else {
          return {
            expenses: [
              ...old.expenses,
              { ...newExpenses, id: uuidv4(), disabled: true },
            ],
          };
        }
      },
    },
    renderLoading: function render(newExpenses: ExpensesForm) {
      return (
        <ToastContent showSpinner>Salvando: {newExpenses.name}...</ToastContent>
      );
    },
    renderError: () => 'Falha ao inserir o registro!',
    renderSuccess: () => `Inserido com sucesso!`,
  });
}

export function useDeleteExpensesMutation(session?: Session | null) {
  const deleteExpenses = useCallback(
    async (expenses: Expenses) => {
      const api = createApi(session);
      return api.delete(`/expenses/${expenses.id}`);
    },
    [session],
  );

  return useMutation('delete-expenses', deleteExpenses, {
    linkedQueries: {
      'get-expenses': (oldExpenses: Expenses[], deletedExpenses: Expenses) =>
        oldExpenses?.map((expenses) =>
          expenses.id === deletedExpenses.id
            ? { ...expenses, disabled: true }
            : expenses,
        ),
    },
    renderLoading: function render() {
      return <ToastContent showSpinner>Excluindo...</ToastContent>;
    },
    renderError: () => `Falha ao excluir o registro!`,
    renderSuccess: () => `Registro excluído com sucesso!`,
  });
}
