import ConfirmDeletePopup from '@/components/ConfirmDeletePopup';
import { FormattedProfiles } from '@/model/Profiles';
import { useDeleteProfilesMutation } from '@/requests/mutations/profiles';
import { GridRowId } from '@mui/x-data-grid';
import { Session } from 'next-auth';
import React, { useCallback, useState } from 'react';

export function useDeleteProfilesWithConfirmation(session?: Session | null) {
const [rows, setRows] = React.useState<FormattedProfiles[]>([]);
  const [profilesToDelete, setProfilesToDelete] = useState(null);
  const deleteProfilesMutation = useDeleteProfilesMutation(session);

  const confirmDelete = useCallback((profiles: any) => {
  return setProfilesToDelete(profiles);
  }, []);

  const handleClosePopup = useCallback(() => {
  setProfilesToDelete(null);
  }, []);

  const handleConfirmDelete = useCallback(
  async (id: GridRowId) => {
  if (profilesToDelete) {
  await deleteProfilesMutation.mutateAsync(profilesToDelete);
  const updatedRows = rows.filter((row) => row.id !== id);
  setRows(updatedRows);
  setProfilesToDelete(null);
  }
  },
  [profilesToDelete, deleteProfilesMutation, rows, setRows],
  );

  const renderDeletePopup = () => (
  <ConfirmDeletePopup
    isOpen={!!profilesToDelete}
    onClose={handleClosePopup}
    onConfirm={handleConfirmDelete}
    obj={ profilesToDelete }
    message="Você tem certeza que deseja excluir?" />
  );

  return { confirmDelete, renderDeletePopup };
}
