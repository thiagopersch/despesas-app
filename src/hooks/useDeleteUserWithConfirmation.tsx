import ConfirmDeletePopup from '@/components/ConfirmDeletePopup';
import { FormattedUsers } from '@/model/User';
import { useDeleteUserMutation } from '@/requests/mutations/users';
import { GridRowId } from '@mui/x-data-grid';
import { Session } from 'next-auth';
import React, { useCallback, useState } from 'react';

export function useDeleteUserWithConfirmation(session?: Session | null) {
  const [rows, setRows] = React.useState<FormattedUsers[]>([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const deleteUserMutation = useDeleteUserMutation(session);

  const confirmDelete = useCallback((user: any) => {
    return setUserToDelete(user);
  }, []);

  const handleClosePopup = useCallback(() => {
    setUserToDelete(null);
  }, []);

  const handleConfirmDelete = useCallback(
    async (id: GridRowId) => {
      if (userToDelete) {
        await deleteUserMutation.mutateAsync(userToDelete);
        const updatedRows = rows.filter((row) => row.id !== id);
        setRows(updatedRows);
        setUserToDelete(null);
      }
    },
    [userToDelete, deleteUserMutation, rows, setRows],
  );

  const renderDeletePopup = () => (
    <ConfirmDeletePopup
      isOpen={!!userToDelete}
      onClose={handleClosePopup}
      onConfirm={handleConfirmDelete}
      user={userToDelete}
      message="Você tem certeza que deseja excluir?"
    />
  );

  return { confirmDelete, renderDeletePopup };
}
