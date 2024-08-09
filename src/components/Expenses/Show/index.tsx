'use client';

import CTA from '@/components/CTA';
import ContainerTable from '@/components/ContainerTable';
import NoRow from '@/components/Table/NoRow';
import { useDeleteExpensesWithConfirmation } from '@/hooks/useDeleteExpensesWithConfirmation';
import { Expenses, FormattedExpenses } from '@/model/Expenses';
import { listExpenses } from '@/requests/queries/expenses';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowModesModel,
} from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import * as React from 'react';
import EditExpensesModal from '../Edit';

const ShowExpenses = () => {
  const [rows, setRows] = React.useState<FormattedExpenses[]>([]);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [ExpensesToEdit, setExpensesToEdit] = React.useState<Expenses>();
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );

  const {
    data: Expenses,
    isError,
    isLoading,
    refetch,
  } = useQuery<FormattedExpenses[]>({
    queryKey: ['get-Expenses'],
    queryFn: () => listExpenses(),
  });

  React.useEffect(() => {
    if (Expenses) {
      setRows(Expenses);
    }
  }, [Expenses]);

  const { data: session } = useSession();
  const { confirmDelete, renderDeletePopup } =
    useDeleteExpensesWithConfirmation(session);

  const handleSaveClick = (id: GridRowId) => () => {
    const ExpensesToEdit = rows.find((row) => row.id === id);
    if (ExpensesToEdit) {
      setOpenPopup(true);
      setExpensesToEdit(ExpensesToEdit);
    }
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    try {
      const ExpensesToDelete = rows.find((row) => row.id === id);
      if (ExpensesToDelete) {
        confirmDelete(ExpensesToDelete);
        const updatedRows = rows.filter((row) => row.id === id);
        setRows(updatedRows);
      }
    } catch (error) {
      console.log(error);
    } finally {
      refetch();
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', width: 350 },
    {
      field: 'situation',
      headerName: 'Situação',
      width: 350,
    },
    {
      field: 'formattedCreatedAt',
      headerName: 'Criado em',
      type: 'string',
      width: 350,
    },
    {
      field: 'formattedUpdatedAt',
      headerName: 'Atualizado em',
      type: 'string',
      width: 350,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Ações',
      width: 200,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <Tooltip title="Editar" key="edit">
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              onClick={handleSaveClick(id)}
              color="primary"
            />
          </Tooltip>,
          <Tooltip title="Deletar" key="delete">
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="error"
            />
          </Tooltip>,
        ];
      },
    },
  ];

  return (
    <>
      <ContainerTable>
        <CTA>
          <Link href={`/expenses/create`}>
            <Button variant="contained" color="success" size="large">
              Cadastrar
            </Button>
          </Link>
        </CTA>
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="cell"
          rowModesModel={rowModesModel}
          loading={isLoading}
          autoHeight
          pageSizeOptions={[10, 50, 100]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
            sorting: {
              sortModel: [{ field: 'name', sort: 'asc' }],
            },
          }}
          slots={{
            noRowsOverlay: NoRow,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          sx={{ '--DataGrid-overlayHeight': '18.75rem' }}
        />
      </ContainerTable>

      {openPopup && (
        <EditExpensesModal
          handleClose={() => setOpenPopup(false)}
          expenses={ExpensesToEdit}
          id={ExpensesToEdit?.id}
        />
      )}

      {renderDeletePopup()}
    </>
  );
};

export default ShowExpenses;
