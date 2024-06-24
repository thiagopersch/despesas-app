import ToastContent from '@/components/ToastContent';
import { Year, YearForm } from '@/model/Year';

import createApi from '@/services/api';
import useMutation from '@/services/useMutation';
import { Session } from 'next-auth';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function useAddYearMutation(session?: Session | null) {
  const addYear = useCallback(
    async (values: YearForm) => {
      const api = createApi(session);
      const requestData = { ...values, id: values.id ? values.id : undefined };

      if (!requestData.id) {
        return api.post('/years', requestData);
      } else {
        return api.patch(`/years/${requestData.id}`, requestData);
      }
    },
    [session],
  );

  return useMutation('add-years', addYear, {
    linkedQueries: {
      'get-years': (
        old: { years: YearForm[] } | undefined,
        newYears: YearForm,
      ) => {
        if (!old || !old.years) {
          return [{ ...newYears, id: uuidv4(), disabled: true }];
        }

        const existingYearsIndex = old.years.findIndex(
          (years) => years.id === newYears.id,
        );

        if (existingYearsIndex > -1) {
          const updatedYears = [...old.years];
          updatedYears[existingYearsIndex] = {
            ...newYears,
            id: old.years[existingYearsIndex].id,
          };
          return { Years: updatedYears };
        } else {
          return {
            years: [
              ...old.years,
              { ...newYears, id: uuidv4(), disabled: true },
            ],
          };
        }
      },
    },
    renderLoading: function render(newYears: YearForm) {
      return (
        <ToastContent showSpinner>Salvando: {newYears.year}...</ToastContent>
      );
    },
    renderError: () => 'Falha ao inserir o registro!',
    renderSuccess: () => `Inserido com sucesso!`,
  });
}

export function useDeleteYearMutation(session?: Session | null) {
  const deletedYears = useCallback(
    async (years: Year) => {
      const api = createApi(session);
      return api.delete(`/years/${years.id}`);
    },
    [session],
  );

  return useMutation('delete-years', deletedYears, {
    linkedQueries: {
      'get-years': (oldYear: Year[], deletedYears: Year) =>
        oldYear?.map((years) =>
          years.id === deletedYears.id ? { ...years, disabled: true } : years,
        ),
    },
    renderLoading: (deletedYear: Year) => (
      <ToastContent showSpinner>
        Removendo o registro: {deletedYear.year}...
      </ToastContent>
    ),
    renderError: () => 'Falha ao deletar o registro!',
    renderSuccess: () => `Deletado com sucesso!`,
  });
}
