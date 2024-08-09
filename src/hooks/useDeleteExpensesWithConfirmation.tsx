import ConfirmDeletePopup from '@/components/ConfirmDeletePopup';
import { FormattedExpenses } from '@/model/Expenses';
import { useDeleteExpensesMutation } from '@/requests/mutations/expenses';
import { GridRowId } from '@mui/x-data-grid';
import { Session } from 'next-auth';
import React, { useCallback, useState } from 'react';

export function useDeleteExpensesWithConfirmation(session?: Session | null) {
  const [rows, setRows] = React.useState<FormattedExpenses[]>([]);
  const [expensesToDelete, setExpensesToDelete] = useState(null);
  const deleteExpensesMutation = useDeleteExpensesMutation(session);

  const confirmDelete = useCallback((expenses: any) => {
    return setExpensesToDelete(expenses);
  }, []);

  const handleClosePopup = useCallback(() => {
    setExpensesToDelete(null);
  }, []);

  const handleConfirmDelete = useCallback(
    async (id: GridRowId) => {
      if (expensesToDelete) {
        await deleteExpensesMutation.mutateAsync(expensesToDelete);
        const updatedRows = rows.filter((row) => row.id !== id);
        setRows(updatedRows);
        setExpensesToDelete(null);
      }
    },
    [expensesToDelete, deleteExpensesMutation, rows, setRows],
  );

  const renderDeletePopup = () => (
    <ConfirmDeletePopup
      isOpen={!!expensesToDelete}
      onClose={handleClosePopup}
      onConfirm={handleConfirmDelete}
      obj={expensesToDelete}
      message="Você tem certeza que deseja excluir?"
    />
  );

  return { confirmDelete, renderDeletePopup };
}
