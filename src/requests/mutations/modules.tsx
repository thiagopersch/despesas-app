import ToastContent from '@/components/ToastContent';
import { Modules, ModulesForm } from '@/model/Modules';

import createApi from '@/services/api';
import useMutation from '@/services/useMutation';
import { Session } from 'next-auth';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function useAddModulesMutation(session?: Session | null) {
  const addModules = useCallback(
    async (values: ModulesForm) => {
      const api = createApi(session);
      const requestData = { ...values, id: values.id ? values.id : undefined };

      if (!requestData.id) {
        return api.post('/modules/', requestData);
      } else {
        return api.patch(`/modules/${requestData.id}`, requestData);
      }
    },
    [session],
  );

  return useMutation('add-modules', addModules, {
    linkedQueries: {
      'get-modules': (
        old: { modules: ModulesForm[] } | undefined,
        newModules: ModulesForm,
      ) => {
        if (!old || !old.modules) {
          return [{ ...newModules, id: uuidv4(), disabled: true }];
        }

        const existingModulesIndex = old.modules.findIndex(
          (modules) => modules.id === newModules.id,
        );

        if (existingModulesIndex > -1) {
          const updateModules = [...old.modules];
          updateModules[existingModulesIndex] = {
            ...newModules,
            id: old.modules[existingModulesIndex].id,
          };
          return { modules: updateModules };
        } else {
          return {
            modules: [
              ...old.modules,
              { ...newModules, id: uuidv4(), disabled: true },
            ],
          };
        }
      },
    },
    renderLoading: function render(newModules: ModulesForm) {
      return (
        <ToastContent showSpinner>Salvando: {newModules.name}...</ToastContent>
      );
    },
    renderError: () => 'Falha ao inserir o registro!',
    renderSuccess: () => `Inserido com sucesso!`,
  });
}

export function useDeleteModulesMutation(session?: Session | null) {
  const deleteModules = useCallback(
    async (modules: Modules) => {
      const api = createApi(session);
      return api.delete(`/modules/${modules.id}`);
    },
    [session],
  );

  return useMutation('delete-modules', deleteModules, {
    linkedQueries: {
      'get-modules': (oldModules: Modules[], deletedModules: Modules) =>
        oldModules?.map((modules) =>
          modules.id === deletedModules.id
            ? { ...modules, disabled: true }
            : modules,
        ),
    },
    renderLoading: function render() {
      return <ToastContent showSpinner>Excluindo...</ToastContent>;
    },
    renderError: () => `Falha ao excluir o registro!`,
    renderSuccess: () => `Registro excluído com sucesso!`,
  });
}
