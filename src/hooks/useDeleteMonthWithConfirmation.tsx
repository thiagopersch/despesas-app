import ConfirmDeletePopup from '@/components/ConfirmDeletePopup';
import { FormattedMonth } from '@/model/Month';
import { useDeleteMonthMutation } from '@/requests/mutations/month';
import { GridRowId } from '@mui/x-data-grid';
import { Session } from 'next-auth';
import React, { useCallback, useState } from 'react';

export function useDeleteMonthWithConfirmation(session?: Session | null) {
  const [rows, setRows] = React.useState<FormattedMonth[]>([]);
  const [monthToDelete, setMonthToDelete] = useState(null);
  const deleteMonthMutation = useDeleteMonthMutation(session);

  const confirmDelete = useCallback((month: any) => {
    return setMonthToDelete(month);
  }, []);

  const handleClosePopup = useCallback(() => {
    setMonthToDelete(null);
  }, []);

  const handleConfirmDelete = useCallback(
    async (id: GridRowId) => {
      if (monthToDelete) {
        await deleteMonthMutation.mutateAsync(monthToDelete);
        const updatedRows = rows.filter((row) => row.id !== id);
        setRows(updatedRows);
        setMonthToDelete(null);
      }
    },
    [monthToDelete, deleteMonthMutation, rows, setRows],
  );

  const renderDeletePopup = () => (
    <ConfirmDeletePopup
      isOpen={!!monthToDelete}
      onClose={handleClosePopup}
      onConfirm={handleConfirmDelete}
      obj={monthToDelete}
      message="Você tem certeza que deseja excluir?"
    />
  );

  return { confirmDelete, renderDeletePopup };
}
