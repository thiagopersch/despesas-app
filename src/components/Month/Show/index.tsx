'use client';

import CTA from '@/components/CTA';
import ContainerTable from '@/components/ContainerTable';
import StatusIcon from '@/components/StatusTable';
import NoRow from '@/components/Table/NoRow';
import { useDeleteMonthWithConfirmation } from '@/hooks/useDeleteMonthWithConfirmation';
import { FormattedMonth } from '@/model/Month';
import { listMonth } from '@/requests/queries/month';
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
import EditMonthModal from '../Edit';

const ShowMonth = () => {
  const [rows, setRows] = React.useState<FormattedMonth[]>([]);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [monthToEdit, setmonthToEdit] = React.useState<FormattedMonth | null>(
    null,
  );
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );

  const { data: session } = useSession();
  const { confirmDelete, renderDeletePopup } =
    useDeleteMonthWithConfirmation(session);

  const {
    data: month,
    isError,
    isLoading,
    refetch,
  } = useQuery<FormattedMonth[]>({
    queryKey: ['get-Month'],
    queryFn: () => listMonth(),
  });

  React.useEffect(() => {
    if (month) {
      setRows(month);
    }
  }, [month]);

  const handleEditClick = (id: GridRowId) => () => {
    const monthToEdit = rows.find((row) => row.id === id);
    if (monthToEdit) {
      setOpenPopup(true);
      setmonthToEdit(monthToEdit);
    }
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    try {
      const MonthToDelete = rows.find((row) => row.id === id);
      if (MonthToDelete) {
        confirmDelete(MonthToDelete);
        const updatedRows = rows.filter((row) => row.id === id);
        setRows(updatedRows);
        refetch();
      }
    } catch (error) {
      console.log(error);
    } finally {
      refetch();
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Mês', width: 200 },
    {
      field: 'status',
      headerName: 'Situação',
      width: 200,
      editable: false,
      renderCell: (params) => {
        return <StatusIcon status={params.value} />;
      },
    },
    {
      field: 'formattedCreatedAt',
      headerName: 'Criado em',
      type: 'string',
      width: 250,
      editable: false,
    },
    {
      field: 'formattedUpdatedAt',
      headerName: 'Atualizado em',
      type: 'string',
      width: 250,
      editable: false,
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
              onClick={handleEditClick(id)}
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

  if (isError) {
    return <div>Error loading data...</div>;
  }

  return (
    <>
      <ContainerTable>
        <CTA>
          <Link href={`/month/create`}>
            <Button variant="contained" color="success" size="large">
              Cadastrar
            </Button>
          </Link>
        </CTA>
        <DataGrid
          rows={rows}
          columns={columns}
          rowModesModel={rowModesModel}
          loading={isLoading}
          rowSelection={false}
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
        <EditMonthModal
          handleClose={() => setOpenPopup(false)}
          month={monthToEdit}
          id={monthToEdit?.id}
        />
      )}

      {renderDeletePopup()}
    </>
  );
};

export default ShowMonth;
