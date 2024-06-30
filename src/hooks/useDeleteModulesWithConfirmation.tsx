import ConfirmDeletePopup from '@/components/ConfirmDeletePopup';
import { FormattedModules } from '@/model/Modules';
import { useDeleteModulesMutation } from '@/requests/mutations/modules';
import { GridRowId } from '@mui/x-data-grid';
import { Session } from 'next-auth';
import React, { useCallback, useState } from 'react';

export function useDeleteModulesWithConfirmation(session?: Session | null) {
  const [rows, setRows] = React.useState<FormattedModules[]>([]);
  const [modulesToDelete, setModulesToDelete] = useState(null);
  const deleteModulesMutation = useDeleteModulesMutation(session);

  const confirmDelete = useCallback((modules: any) => {
    return setModulesToDelete(modules);
  }, []);

  const handleClosePopup = useCallback(() => {
    setModulesToDelete(null);
  }, []);

  const handleConfirmDelete = useCallback(
    async (id: GridRowId) => {
      if (modulesToDelete) {
        await deleteModulesMutation.mutateAsync(modulesToDelete);
        const updatedRows = rows.filter((row) => row.id !== id);
        setRows(updatedRows);
        setModulesToDelete(null);
      }
    },
    [modulesToDelete, deleteModulesMutation, rows, setRows],
  );

  const renderDeletePopup = () => (
    <ConfirmDeletePopup
      isOpen={!!modulesToDelete}
      onClose={handleClosePopup}
      onConfirm={handleConfirmDelete}
      obj={modulesToDelete}
      message="Você tem certeza que deseja excluir?"
    />
  );

  return { confirmDelete, renderDeletePopup };
}
