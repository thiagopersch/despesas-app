import ToastContent from '@/components/ToastContent';
import { Situation, SituationForm } from '@/model/Situation';

import createApi from '@/services/api';
import useMutation from '@/services/useMutation';
import { Session } from 'next-auth';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function useAddSituationMutation(session?: Session | null) {
  const addSituation = useCallback(
    async (values: SituationForm) => {
      const api = createApi(session);
      const requestData = { ...values, id: values.id ? values.id : undefined };

      if (!requestData.id) {
        return api.post('/situations/', requestData);
      } else {
        return api.patch(`/situations/${requestData.id}`, requestData);
      }
    },
    [session],
  );

  return useMutation('add-situation', addSituation, {
    linkedQueries: {
      'get-situation': (
        old: { situation: SituationForm[] } | undefined,
        newSituation: SituationForm,
      ) => {
        if (!old || !old.situation) {
          return [{ ...newSituation, id: uuidv4(), disabled: true }];
        }

        const existingSituationIndex = old.situation.findIndex(
          (situation) => situation.id === newSituation.id,
        );

        if (existingSituationIndex > -1) {
          const updateSituation = [...old.situation];
          updateSituation[existingSituationIndex] = {
            ...newSituation,
            id: old.situation[existingSituationIndex].id,
          };
          return { situation: updateSituation };
        } else {
          return {
            situation: [
              ...old.situation,
              { ...newSituation, id: uuidv4(), disabled: true },
            ],
          };
        }
      },
    },
    renderLoading: function render(newSituation: SituationForm) {
      return (
        <ToastContent showSpinner>
          Salvando: {newSituation.name}...
        </ToastContent>
      );
    },
    renderError: () => 'Falha ao inserir o registro!',
    renderSuccess: () => `Inserido com sucesso!`,
  });
}

export function useDeleteSituationMutation(session?: Session | null) {
  const deleteSituation = useCallback(
    async (situation: Situation) => {
      const api = createApi(session);
      return api.delete(`/situations/${situation.id}`);
    },
    [session],
  );

  return useMutation('delete-situation', deleteSituation, {
    linkedQueries: {
      'get-situation': (
        oldSituation: Situation[],
        deletedSituation: Situation,
      ) =>
        oldSituation?.map((situation) =>
          situation.id === deletedSituation.id
            ? { ...situation, disabled: true }
            : situation,
        ),
    },
    renderLoading: function render() {
      return <ToastContent showSpinner>Excluindo...</ToastContent>;
    },
    renderError: () => `Falha ao excluir o registro!`,
    renderSuccess: () => `Registro excluído com sucesso!`,
  });
}
