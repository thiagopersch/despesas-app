import ToastContent from '@/components/ToastContent';
import { Priority, PriorityForm } from '@/model/Priority';

import createApi from '@/services/api';
import useMutation from '@/services/useMutation';
import { Session } from 'next-auth';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function useAddPriorityMutation(session?: Session | null) {
  const addPriority = useCallback(
    async (values: PriorityForm) => {
      const api = createApi(session);
      const requestData = { ...values, id: values.id ? values.id : undefined };

      if (!requestData.id) {
        return api.post('/priority/', requestData);
      } else {
        return api.patch(`/priority/${requestData.id}`, requestData);
      }
    },
    [session],
  );

  return useMutation('add-priority', addPriority, {
    linkedQueries: {
      'get-priorities': (
        old: { priority: PriorityForm[] } | undefined,
        newPriority: PriorityForm,
      ) => {
        if (!old || !old.priority) {
          return [{ ...newPriority, id: uuidv4(), disabled: true }];
        }

        const existingPriorityIndex = old.priority.findIndex(
          (priority) => priority.id === newPriority.id,
        );

        if (existingPriorityIndex > -1) {
          const updatePriority = [...old.priority];
          updatePriority[existingPriorityIndex] = {
            ...newPriority,
            id: old.priority[existingPriorityIndex].id,
          };
          return { priority: updatePriority };
        } else {
          return {
            priority: [
              ...old.priority,
              { ...newPriority, id: uuidv4(), disabled: true },
            ],
          };
        }
      },
    },
    renderLoading: function render(newPriority: PriorityForm) {
      return (
        <ToastContent showSpinner>Salvando: {newPriority.name}...</ToastContent>
      );
    },
    renderError: () => 'Falha ao inserir o registro!',
    renderSuccess: () => `Inserido com sucesso!`,
  });
}

export function useDeletePriorityMutation(session?: Session | null) {
  const deletePriority = useCallback(
    async (priority: Priority) => {
      const api = createApi(session);
      return api.delete(`/priority/${priority.id}`);
    },
    [session],
  );

  return useMutation('delete-priority', deletePriority, {
    linkedQueries: {
      'get-priotiries': (oldPriority: Priority[], deletePriority: Priority) =>
        oldPriority?.map((priority) =>
          priority.id === deletePriority.id
            ? { ...priority, disabled: true }
            : priority,
        ),
    },
    renderLoading: (deletedPriority: Priority) => (
      <ToastContent showSpinner>
        Removendo o registro: {deletedPriority.name}...
      </ToastContent>
    ),
    renderError: () => 'Falha ao deletar o registro!',
    renderSuccess: () => `Deletado com sucesso!`,
  });
}
