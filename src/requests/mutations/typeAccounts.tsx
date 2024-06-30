import ToastContent from '@/components/ToastContent';
import { TypeAccounts, TypeAccountsForm } from '@/model/TypeAccounts';

import createApi from '@/services/api';
import useMutation from '@/services/useMutation';
import { Session } from 'next-auth';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function useAddTypeAccountsMutation(session?: Session | null) {
  const addTypeAccounts = useCallback(
    async (values: TypeAccountsForm) => {
      const api = createApi(session);
      const requestData = { ...values, id: values.id ? values.id : undefined };

      if (!requestData.id) {
        return api.post('/type-accounts/', requestData);
      } else {
        return api.patch(`/type-accounts/${requestData.id}`, requestData);
      }
    },
    [session],
  );

  return useMutation('add-typeAccounts', addTypeAccounts, {
    linkedQueries: {
      'get-typeAccounts': (
        old: { typeAccounts: TypeAccountsForm[] } | undefined,
        newTypeAccounts: TypeAccountsForm,
      ) => {
        if (!old || !old.typeAccounts) {
          return [{ ...newTypeAccounts, id: uuidv4(), disabled: true }];
        }

        const existingTypeAccountsIndex = old.typeAccounts.findIndex(
          (typeAccounts) => typeAccounts.id === newTypeAccounts.id,
        );

        if (existingTypeAccountsIndex > -1) {
          const updateTypeAccounts = [...old.typeAccounts];
          updateTypeAccounts[existingTypeAccountsIndex] = {
            ...newTypeAccounts,
            id: old.typeAccounts[existingTypeAccountsIndex].id,
          };
          return { typeAccounts: updateTypeAccounts };
        } else {
          return {
            typeAccounts: [
              ...old.typeAccounts,
              { ...newTypeAccounts, id: uuidv4(), disabled: true },
            ],
          };
        }
      },
    },
    renderLoading: function render(newTypeAccounts: TypeAccountsForm) {
      return (
        <ToastContent showSpinner>
          Salvando: {newTypeAccounts.bank_name}...
        </ToastContent>
      );
    },
    renderError: () => 'Falha ao inserir o registro!',
    renderSuccess: () => `Inserido com sucesso!`,
  });
}

export function useDeleteTypeAccountsMutation(session?: Session | null) {
  const deleteTypeAccounts = useCallback(
    async (typeAccounts: TypeAccounts) => {
      const api = createApi(session);
      return api.delete(`/type-accounts/${typeAccounts.id}`);
    },
    [session],
  );

  return useMutation('delete-typeAccounts', deleteTypeAccounts, {
    linkedQueries: {
      'get-typeAccounts': (
        oldTypeAccounts: TypeAccounts[],
        deletedTypeAccounts: TypeAccounts,
      ) =>
        oldTypeAccounts?.map((typeAccounts) =>
          typeAccounts.id === deletedTypeAccounts.id
            ? { ...typeAccounts, disabled: true }
            : typeAccounts,
        ),
    },
    renderLoading: function render() {
      return <ToastContent showSpinner>Excluindo...</ToastContent>;
    },
    renderError: () => `Falha ao excluir o registro!`,
    renderSuccess: () => `Registro excluído com sucesso!`,
  });
}
