import { ModalCustomizedProps } from "@/components/Modal";
import ToastContent from "@/components/ToastContent";
import { User, UserForm } from "@/model/User";
import createApi from "@/services/api";
import useMutation from "@/services/useMutation";
import { Session } from "next-auth";
import { RefObject, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

export function useAddUserMutation(
  modalRef: RefObject<ModalCustomizedProps>,
  session?: Session | null
) {
  const addUser = useCallback(
    async (values: UserForm) => {
      const api = createApi(session);

      const { id, ...requestData } = values;

      return id
        ? api.put(`/auth/update-user/${id}`, requestData)
        : api.post("/auth/register", requestData);
    },
    [session]
  );

  return useMutation("add-user", addUser, {
    linkedQueries: {
      "get-users": (old, newClient) => [
        ...old,
        { ...newClient, id: uuidv4(), disabled: true },
      ],
    },
    onMutate: () => modalRef.current?.onClose(),
    renderLoading: function render() {
      return (
        <ToastContent showSpinner>Salvando as informações...</ToastContent>
      );
    },
    renderError: () => `Falha ao criar registro!`,
    renderSuccess: () => `Criado com sucesso!`,
  });
}

export function useDeleteUserMutation(session?: Session | null) {
  const deleteUser = useCallback(
    async (user: any) => {
      const api = createApi(session);

      return api.delete(`/users/${user.id}`);
    },
    [session]
  );

  return useMutation("delete-user", deleteUser, {
    linkedQueries: {
      "get-users": (old: User[], deletedUser: User) =>
        old.map((user) =>
          user.id === deletedUser.id ? { ...user, disabled: true } : user
        ),
    },
    // onMutate: () => modalRef.current?.closeModal(),
    renderLoading: function render(deletedUser) {
      return (
        <ToastContent showSpinner>
          Removendo o usário: ${deletedUser.name}...
        </ToastContent>
      );
    },
    renderError: () => `Falha ao remover o registro`,
    renderSuccess: () => `Deletado com sucesso...`,
  });
}
