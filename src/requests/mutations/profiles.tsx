import ToastContent from '@/components/ToastContent';
import { Profiles, ProfilesForm } from '@/model/Profiles';

import createApi from '@/services/api';
import useMutation from '@/services/useMutation';
import { Session } from 'next-auth';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function useAddProfilesMutation(session?: Session | null) {
  const addProfiles = useCallback(
    async (values: ProfilesForm) => {
      const api = createApi(session);
      const requestData = { ...values, id: values.id ? values.id : undefined };

      if (!requestData.id) {
        return api.post('/profiles/', requestData);
      } else {
        return api.patch(`/profiles/${requestData.id}`, requestData);
      }
    },[session],
);

return useMutation('add-profiles', addProfiles, {
    linkedQueries: {
      'get-profiles': (
        old: { profiles: ProfilesForm[] } | undefined,
        newProfiles: ProfilesForm,
      ) => {
        if (!old || !old.profiles) {
          return [{ ...newProfiles, id: uuidv4(), disabled: true }];
        }

      const existingProfilesIndex = old.profiles.findIndex(
        (profiles) => profiles.id === newProfiles.id,
      );

      if (existingProfilesIndex > -1) {
        const updateProfiles = [...old.profiles];
        updateProfiles[existingProfilesIndex] = {
          ...newProfiles,
          id: old.profiles[existingProfilesIndex].id,
        };
        return { profiles: updateProfiles };
      } else {
        return {
            profiles: [
            ...old.profiles,
            { ...newProfiles, id: uuidv4(), disabled: true },
          ],
        };
      }
    },
  },
  renderLoading: function render(newProfiles: ProfilesForm) {
    return (
        <ToastContent showSpinner>Salvando: {newProfiles.name}...</ToastContent>
      );
    },
  renderError: () => 'Falha ao inserir o registro!',
  renderSuccess: () => `Inserido com sucesso!`,
  });
}

export function useDeleteProfilesMutation(session?: Session | null) {
  const deleteProfiles = useCallback(
    async (profiles: Profiles) => {
      const api = createApi(session);
      return api.delete(`/profiles/${ profiles .id}`);
    },
  [session],
);

return useMutation('delete-profiles', deleteProfiles, {
    linkedQueries: {
    'get-profiles': (oldProfiles: Profiles[], deletedProfiles: Profiles) =>
      oldProfiles?.map((profiles) =>
        profiles.id === deletedProfiles.id ? { ...profiles, disabled: true } : profiles,
      ),
    },
  renderLoading: function render() {
    return <ToastContent showSpinner>Excluindo...</ToastContent>;
  },
  renderError: () => `Falha ao excluir o registro!`,
  renderSuccess: () => `Registro excluído com sucesso!`,
  });
}
