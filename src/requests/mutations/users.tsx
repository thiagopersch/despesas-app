import ToastContent from '@/components/ToastContent';
import { User, UserForm } from '@/model/User';
import createApi from '@/services/api';
import useMutation from '@/services/useMutation';
import { Session } from 'next-auth';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function useAddUserMutation(session?: Session | null) {
  const addUser = useCallback(
    async (values: UserForm) => {
      const api = createApi(session);

      const { id, ...requestData } = values;

      return id
        ? api.put(`/users/${id}`, requestData)
        : api.post('/users/create', requestData);
    },
    [session],
  );

  return useMutation('add-user', addUser, {
    linkedQueries: {
      'get-users': (old, newUser: UserForm) => [
        ...old,
        { ...newUser, id: uuidv4(), disabled: true },
      ],
    },
    renderLoading: function render(newUser: UserForm) {
      return (
        <ToastContent showSpinner>
          Salvando usuário {newUser.name}...
        </ToastContent>
      );
    },
    renderError: () => 'Falha ao inserir usuário',
    renderSuccess: () => `Usuário inserido com sucesso`,
  });
}

export function useDeleteUserMutation(session?: Session) {
  const deleteUser = useCallback(
    async (user: User) => {
      const api = createApi(session);
      return api.delete(`/users/${user.id}`);
    },
    [session],
  );

  return useMutation('delete-user', deleteUser, {
    linkedQueries: {
      'delete-user': (oldUsers: User[], deletedUser: User) =>
        oldUsers.map((user) =>
          user.id === deletedUser.id ? { ...user, disabled: true } : user,
        ),
    },
    renderLoading: (deletedUser: User) => (
      <ToastContent showSpinner>
        Removendo o usuário: {deletedUser.name}...
      </ToastContent>
    ),
    renderError: () => 'Falha ao remover o registro!',
    renderSuccess: () => 'Deletado com sucesso!',
  });
}
