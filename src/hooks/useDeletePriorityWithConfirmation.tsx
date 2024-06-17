import ConfirmDeletePopup from '@/components/ConfirmDeletePopup';
import { FormattedPriority } from '@/model/Priority';
import { useAddPriorityMutation } from '@/requests/mutations/priorities';
import { GridRowId } from '@mui/x-data-grid';
import { Session } from 'next-auth';
import React, { useCallback, useState } from 'react';

export function useDeletePriorityWithConfirmation(session?: Session | null) {
  const [rows, setRows] = React.useState<FormattedPriority[]>([]);
  const [priorityToDelete, setPriorityToDelete] = useState(null);
  const deletePriorityMutation = useAddPriorityMutation(session);

  const confirmDelete = useCallback((priority: any) => {
    return setPriorityToDelete(priority);
  }, []);

  const handleClosePopup = useCallback(() => {
    setPriorityToDelete(null);
  }, []);

  const handleConfirmDelete = useCallback(
    async (id: GridRowId) => {
      if (priorityToDelete) {
        await deletePriorityMutation.mutateAsync(priorityToDelete);
        const updatedRows = rows.filter((row) => row.id !== id);
        setRows(updatedRows);
        setPriorityToDelete(null);
      }
    },
    [priorityToDelete, deletePriorityMutation, rows, setRows],
  );

  const renderDeletePopup = () => (
    <ConfirmDeletePopup
      isOpen={!!priorityToDelete}
      onClose={handleClosePopup}
      onConfirm={handleConfirmDelete}
      obj={priorityToDelete}
      message="Você tem certeza que deseja excluir?"
    />
  );

  return { confirmDelete, renderDeletePopup };
}
