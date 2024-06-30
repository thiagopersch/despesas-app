import ConfirmDeletePopup from '@/components/ConfirmDeletePopup';
import { FormattedTypeAccounts } from '@/model/TypeAccounts';
import { useDeleteTypeAccountsMutation } from '@/requests/mutations/typeAccounts';
import { GridRowId } from '@mui/x-data-grid';
import { Session } from 'next-auth';
import React, { useCallback, useState } from 'react';

export function useDeleteTypeAccountsWithConfirmation(
  session?: Session | null,
) {
  const [rows, setRows] = React.useState<FormattedTypeAccounts[]>([]);
  const [typeAccountsToDelete, setTypeAccountsToDelete] = useState(null);
  const deleteTypeAccountsMutation = useDeleteTypeAccountsMutation(session);

  const confirmDelete = useCallback((typeAccounts: any) => {
    return setTypeAccountsToDelete(typeAccounts);
  }, []);

  const handleClosePopup = useCallback(() => {
    setTypeAccountsToDelete(null);
  }, []);

  const handleConfirmDelete = useCallback(
    async (id: GridRowId) => {
      if (typeAccountsToDelete) {
        await deleteTypeAccountsMutation.mutateAsync(typeAccountsToDelete);
        const updatedRows = rows.filter((row) => row.id !== id);
        setRows(updatedRows);
        setTypeAccountsToDelete(null);
      }
    },
    [typeAccountsToDelete, deleteTypeAccountsMutation, rows, setRows],
  );

  const renderDeletePopup = () => (
    <ConfirmDeletePopup
      isOpen={!!typeAccountsToDelete}
      onClose={handleClosePopup}
      onConfirm={handleConfirmDelete}
      obj={typeAccountsToDelete}
      message="Você tem certeza que deseja excluir?"
    />
  );

  return { confirmDelete, renderDeletePopup };
}
