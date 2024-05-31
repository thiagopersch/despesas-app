import ConfirmDeletePopup from '@/components/ConfirmDeletePopup';
import { FormattedCategory } from '@/model/Category';
import { useDeleteCategoryMutation } from '@/requests/mutations/categories';
import { GridRowId } from '@mui/x-data-grid';
import { Session } from 'next-auth';
import React, { useCallback, useState } from 'react';

export function useDeleteCategoryWithConfirmation(session?: Session | null) {
  const [rows, setRows] = React.useState<FormattedCategory[]>([]);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const deleteCategoryutation = useDeleteCategoryMutation(session);

  const confirmDelete = useCallback((category: any) => {
    return setCategoryToDelete(category);
  }, []);

  const handleClosePopup = useCallback(() => {
    setCategoryToDelete(null);
  }, []);

  const handleConfirmDelete = useCallback(
    async (id: GridRowId) => {
      if (categoryToDelete) {
        await deleteCategoryutation.mutateAsync(categoryToDelete);
        const updatedRows = rows.filter((row) => row.id !== id);
        setRows(updatedRows);
        setCategoryToDelete(null);
      }
    },
    [categoryToDelete, deleteCategoryutation, rows, setRows],
  );

  const renderDeletePopup = () => (
    <ConfirmDeletePopup
      isOpen={!!categoryToDelete}
      onClose={handleClosePopup}
      onConfirm={handleConfirmDelete}
      obj={categoryToDelete}
      message="Você tem certeza que deseja excluir?"
    />
  );

  return { confirmDelete, renderDeletePopup };
}
