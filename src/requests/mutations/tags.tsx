import ToastContent from '@/components/ToastContent';
import { Tags, TagsForm } from '@/model/Tags';

import createApi from '@/services/api';
import useMutation from '@/services/useMutation';
import { Session } from 'next-auth';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function useAddTagsMutation(session?: Session | null) {
  const addTags = useCallback(
    async (values: TagsForm) => {
      const api = createApi(session);
      const requestData = { ...values, id: values.id ? values.id : undefined };

      if (!requestData.id) {
        return api.post('/tags/', requestData);
      } else {
        return api.patch(`/tags/${requestData.id}`, requestData);
      }
    },
    [session],
  );

  return useMutation('add-tags', addTags, {
    linkedQueries: {
      'get-tags': (
        old: { tags: TagsForm[] } | undefined,
        newTags: TagsForm,
      ) => {
        if (!old || !old.tags) {
          return [{ ...newTags, id: uuidv4(), disabled: true }];
        }

        const existingTagsIndex = old.tags.findIndex(
          (tags) => tags.id === newTags.id,
        );

        if (existingTagsIndex > -1) {
          const updateTags = [...old.tags];
          updateTags[existingTagsIndex] = {
            ...newTags,
            id: old.tags[existingTagsIndex].id,
          };
          return { tags: updateTags };
        } else {
          return {
            tags: [...old.tags, { ...newTags, id: uuidv4(), disabled: true }],
          };
        }
      },
    },
    renderLoading: function render(newTags: TagsForm) {
      return (
        <ToastContent showSpinner>Salvando: {newTags.name}...</ToastContent>
      );
    },
    renderError: () => 'Falha ao inserir o registro!',
    renderSuccess: () => `Inserido com sucesso!`,
  });
}

export function useDeleteTagsMutation(session?: Session | null) {
  const deleteTags = useCallback(
    async (tags: Tags) => {
      const api = createApi(session);
      return api.delete(`/tags/${tags.id}`);
    },
    [session],
  );

  return useMutation('delete-tags', deleteTags, {
    linkedQueries: {
      'get-tags': (oldTags: Tags[], deletedTags: Tags) =>
        oldTags?.map((tags) =>
          tags.id === deletedTags.id ? { ...tags, disabled: true } : tags,
        ),
    },
    renderLoading: function render(tags: Tags) {
      return <ToastContent showSpinner>Excluindo...</ToastContent>;
    },
    renderError: (tags: Tags) => `Falha ao excluir o registro!`,
    renderSuccess: (tags: Tags) => `Excluído com sucesso!`,
  });
}
