import ToastContent from '@/components/ToastContent';
import { Month, MonthForm } from '@/model/Month';

import createApi from '@/services/api';
import useMutation from '@/services/useMutation';
import { Session } from 'next-auth';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function useAddMonthMutation(session?: Session | null) {
  const addMonth = useCallback(
    async (values: MonthForm) => {
      const api = createApi(session);
      const requestData = { ...values, id: values.id ? values.id : undefined };

      if (!requestData.id) {
        return api.post('/months/', requestData);
      } else {
        return api.patch(`/months/${requestData.id}`, requestData);
      }
    },
    [session],
  );

  return useMutation('add-month', addMonth, {
    linkedQueries: {
      'get-month': (
        old: { month: MonthForm[] } | undefined,
        newMonth: MonthForm,
      ) => {
        if (!old || !old.month) {
          return [{ ...newMonth, id: uuidv4(), disabled: true }];
        }

        const existingMonthIndex = old.month.findIndex(
          (month) => month.id === newMonth.id,
        );

        if (existingMonthIndex > -1) {
          const updateMonth = [...old.month];
          updateMonth[existingMonthIndex] = {
            ...newMonth,
            id: old.month[existingMonthIndex].id,
          };
          return { month: updateMonth };
        } else {
          return {
            month: [
              ...old.month,
              { ...newMonth, id: uuidv4(), disabled: true },
            ],
          };
        }
      },
    },
    renderLoading: function render(newMonth: MonthForm) {
      return (
        <ToastContent showSpinner>Salvando: {newMonth.name}...</ToastContent>
      );
    },
    renderError: () => 'Falha ao inserir o registro!',
    renderSuccess: () => `Inserido com sucesso!`,
  });
}

export function useDeleteMonthMutation(session?: Session | null) {
  const deleteMonth = useCallback(
    async (month: Month) => {
      const api = createApi(session);
      return api.delete(`/months/${month.id}`);
    },
    [session],
  );

  return useMutation('delete-month', deleteMonth, {
    linkedQueries: {
      'get-month': (oldMonth: Month[], deletedMonth: Month) =>
        oldMonth?.map((month) =>
          month.id === deletedMonth.id ? { ...month, disabled: true } : month,
        ),
    },
    renderLoading: function render(month: Month) {
      return <ToastContent showSpinner>Excluindo...</ToastContent>;
    },
    renderError: (month: Month) => `Falha ao excluir`,
    renderSuccess: (month: Month) => `Excluído com sucesso!`,
  });
}
