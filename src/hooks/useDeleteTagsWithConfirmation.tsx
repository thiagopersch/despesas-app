import ConfirmDeletePopup from '@/components/ConfirmDeletePopup';
import { FormattedTags } from '@/model/Tags';
import { useDeleteTagsMutation } from '@/requests/mutations/tags';
import { GridRowId } from '@mui/x-data-grid';
import { Session } from 'next-auth';
import React, { useCallback, useState } from 'react';

export function useDeleteTagsWithConfirmation(session?: Session | null) {
  const [rows, setRows] = React.useState<FormattedTags[]>([]);
  const [tagsToDelete, setTagsToDelete] = useState(null);
  const deleteTagsMutation = useDeleteTagsMutation(session);

  const confirmDelete = useCallback((tags: any) => {
    return setTagsToDelete(tags);
  }, []);

  const handleClosePopup = useCallback(() => {
    setTagsToDelete(null);
  }, []);

  const handleConfirmDelete = useCallback(
    async (id: GridRowId) => {
      if (tagsToDelete) {
        await deleteTagsMutation.mutateAsync(tagsToDelete);
        const updatedRows = rows.filter((row) => row.id !== id);
        setRows(updatedRows);
        setTagsToDelete(null);
      }
    },
    [tagsToDelete, deleteTagsMutation, rows, setRows],
  );

  const renderDeletePopup = () => (
    <ConfirmDeletePopup
      isOpen={!!tagsToDelete}
      onClose={handleClosePopup}
      onConfirm={handleConfirmDelete}
      obj={tagsToDelete}
      message="Você tem certeza que deseja excluir?"
    />
  );

  return { confirmDelete, renderDeletePopup };
}
