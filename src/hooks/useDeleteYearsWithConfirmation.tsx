import ConfirmDeletePopup from '@/components/ConfirmDeletePopup';
import { FormattedYear } from '@/model/Year';
import { useDeleteYearMutation } from '@/requests/mutations/years';
import { GridRowId } from '@mui/x-data-grid';
import { Session } from 'next-auth';
import React, { useCallback, useState } from 'react';

export function useDeleteYearsWithConfirmation(session?: Session | null) {
  const [rows, setRows] = React.useState<FormattedYear[]>([]);
  const [yearsToDelete, setYearsToDelete] = useState(null);
  const deleteYearsMutation = useDeleteYearMutation(session);

  const confirmDelete = useCallback((years: any) => {
    return setYearsToDelete(years);
  }, []);

  const handleClosePopup = useCallback(() => {
    setYearsToDelete(null);
  }, []);

  const handleConfirmDelete = useCallback(
    async (id: GridRowId) => {
      if (yearsToDelete) {
        await deleteYearsMutation.mutateAsync(yearsToDelete);
        const updatedRows = rows.filter((row) => row.id !== id);
        setRows(updatedRows);
        setYearsToDelete(null);
      }
    },
    [yearsToDelete, deleteYearsMutation, rows, setRows],
  );

  const renderDeletePopup = () => (
    <ConfirmDeletePopup
      isOpen={!!yearsToDelete}
      onClose={handleClosePopup}
      onConfirm={handleConfirmDelete}
      obj={yearsToDelete}
      message="Você tem certeza que deseja excluir?"
    />
  );

  return { confirmDelete, renderDeletePopup };
}
