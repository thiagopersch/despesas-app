import ConfirmDeletePopup from '@/components/ConfirmDeletePopup';
import { FormattedSituation } from '@/model/Situation';
import { useDeleteSituationMutation } from '@/requests/mutations/situation';
import { GridRowId } from '@mui/x-data-grid';
import { Session } from 'next-auth';
import React, { useCallback, useState } from 'react';

export function useDeleteSituationWithConfirmation(session?: Session | null) {
  const [rows, setRows] = React.useState<FormattedSituation[]>([]);
  const [situationToDelete, setSituationToDelete] = useState(null);
  const deleteSituationMutation = useDeleteSituationMutation(session);

  const confirmDelete = useCallback((situation: any) => {
    return setSituationToDelete(situation);
  }, []);

  const handleClosePopup = useCallback(() => {
    setSituationToDelete(null);
  }, []);

  const handleConfirmDelete = useCallback(
    async (id: GridRowId) => {
      if (situationToDelete) {
        await deleteSituationMutation.mutateAsync(situationToDelete);
        const updatedRows = rows.filter((row) => row.id !== id);
        setRows(updatedRows);
        setSituationToDelete(null);
      }
    },
    [situationToDelete, deleteSituationMutation, rows, setRows],
  );

  const renderDeletePopup = () => (
    <ConfirmDeletePopup
      isOpen={!!situationToDelete}
      onClose={handleClosePopup}
      onConfirm={handleConfirmDelete}
      obj={situationToDelete}
      message="Você tem certeza que deseja excluir?"
    />
  );

  return { confirmDelete, renderDeletePopup };
}
