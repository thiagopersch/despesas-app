import ToastContent from '@/components/ToastContent';
import { Category, CategoryForm } from '@/model/Category';

import createApi from '@/services/api';
import useMutation from '@/services/useMutation';
import { Session } from 'next-auth';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function useAddCategoryMutation(session?: Session | null) {
  const addCategory = useCallback(
    async (values: CategoryForm) => {
      const api = createApi(session);
      const requestData = { ...values, id: values.id ? values.id : undefined };

      if (!requestData.id) {
        return api.post('/category/create', requestData);
      } else {
        return api.patch(`/category/${requestData.id}`, requestData);
      }
    },
    [session],
  );

  return useMutation('add-category', addCategory, {
    linkedQueries: {
      'get-categories': (
        old: { categories: CategoryForm[] } | undefined,
        newCategory: CategoryForm,
      ) => {
        if (!old || !old.categories) {
          return [{ ...newCategory, id: uuidv4(), disabled: true }];
        }

        const existingUserIndex = old.categories.findIndex(
          (category) => category.id === newCategory.id,
        );

        if (existingUserIndex > -1) {
          const updateCategories = [...old.categories];
          updateCategories[existingUserIndex] = {
            ...newCategory,
            id: old.categories[existingUserIndex].id,
          };
          return { categories: updateCategories };
        } else {
          return {
            categories: [
              ...old.categories,
              { ...newCategory, id: uuidv4(), disabled: true },
            ],
          };
        }
      },
    },
    renderLoading: function render(newCategory: CategoryForm) {
      return (
        <ToastContent showSpinner>Salvando: {newCategory.name}...</ToastContent>
      );
    },
    renderError: () => 'Falha ao inserir o registro!',
    renderSuccess: () => `Inserido com sucesso!`,
  });
}

export function useDeleteCategoryMutation(session?: Session | null) {
  const deleteCategory = useCallback(
    async (category: Category) => {
      const api = createApi(session);
      return api.delete(`/category/${category.id}`);
    },
    [session],
  );

  return useMutation('delete-category', deleteCategory, {
    linkedQueries: {
      'get-categories': (oldCategory: Category[], deletedUser: Category) =>
        oldCategory?.map((category) =>
          category.id === deletedUser.id
            ? { ...category, disabled: true }
            : category,
        ),
    },
    renderLoading: (deletedCategory: Category) => (
      <ToastContent showSpinner>
        Removendo o registro: {deletedCategory.name}...
      </ToastContent>
    ),
    renderError: () => 'Falha ao deletar o registro!',
    renderSuccess: () => `Deletado com sucesso!`,
  });
}
