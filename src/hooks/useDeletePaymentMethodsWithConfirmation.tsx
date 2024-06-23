import ConfirmDeletePopup from '@/components/ConfirmDeletePopup';
import { FormattedPaymentMethods } from '@/model/PaymentMethods';
import { useDeletePaymentMethodsMutation } from '@/requests/mutations/paymentMethods';
import { GridRowId } from '@mui/x-data-grid';
import { Session } from 'next-auth';
import React, { useCallback, useState } from 'react';

export function useDeletePaymentMethodsWithConfirmation(
  session?: Session | null,
) {
  const [rows, setRows] = React.useState<FormattedPaymentMethods[]>([]);
  const [paymentMethodsToDelete, setPaymentMethodsToDelete] = useState(null);
  const deletePaymentMethodsMutation = useDeletePaymentMethodsMutation(session);

  const confirmDelete = useCallback((paymentMethods: any) => {
    return setPaymentMethodsToDelete(paymentMethods);
  }, []);

  const handleClosePopup = useCallback(() => {
    setPaymentMethodsToDelete(null);
  }, []);

  const handleConfirmDelete = useCallback(
    async (id: GridRowId) => {
      if (paymentMethodsToDelete) {
        await deletePaymentMethodsMutation.mutateAsync(paymentMethodsToDelete);
        const updatedRows = rows.filter((row) => row.id !== id);
        setRows(updatedRows);
        setPaymentMethodsToDelete(null);
      }
    },
    [paymentMethodsToDelete, deletePaymentMethodsMutation, rows, setRows],
  );

  const renderDeletePopup = () => (
    <ConfirmDeletePopup
      isOpen={!!paymentMethodsToDelete}
      onClose={handleClosePopup}
      onConfirm={handleConfirmDelete}
      obj={paymentMethodsToDelete}
      message="Você tem certeza que deseja excluir?"
    />
  );

  return { confirmDelete, renderDeletePopup };
}
