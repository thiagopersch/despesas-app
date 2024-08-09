'use client';

import CTA from '@/components/CTA';
import StatusIcon from '@/components/StatusTable';
import NoRow from '@/components/Table/NoRow';
import { useDeletePriorityWithConfirmation } from '@/hooks/useDeletePriorityWithConfirmation';
import { FormattedPriority, Priority } from '@/model/Priority';
import { listPriorities } from '@/requests/queries/priorities';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
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
import ContainerTable from '../../ContainerTable';
import EditPriorityModal from '../Edit';

export default function TablePriority() {
  const [rows, setRows] = React.useState<FormattedPriority[]>([]);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [priorityToEdit, setPriorityToEdit] = React.useState<Priority>();
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );

  const {
    data: priority,
    isError,
    isLoading,
    refetch,
  } = useQuery<FormattedPriority[]>({
    queryKey: ['get-priority'],
    queryFn: () => listPriorities(),
  });

  React.useEffect(() => {
    if (priority) setRows(priority);
  });

  const { data: session } = useSession();
  const { confirmDelete, renderDeletePopup } =
    useDeletePriorityWithConfirmation(session);

  const handleSaveClick = (id: GridRowId) => () => {
    const priorityToEdit = rows.find((row) => row.id === id);
    if (priorityToEdit) {
      setOpenPopup(true);
      setPriorityToEdit(priorityToEdit);
    }
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    try {
      const priorityToDelete = rows.find((row) => row.id === id);
      if (priorityToDelete) {
        confirmDelete(priorityToDelete);
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
    { field: 'name', headerName: 'Nome', width: 200, editable: false },
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
      width: 200,
      editable: false,
    },
    {
      field: 'formattedUpdatedAt',
      headerName: 'Atualizado em',
      type: 'string',
      width: 200,
      editable: false,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Ações',
      width: 230,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleSaveClick(id)}
            color="primary"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="error"
          />,
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
          <Link href="/priority/create">
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
          checkboxSelection
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
        <EditPriorityModal
          handleClose={() => setOpenPopup(false)}
          priority={priorityToEdit}
          id={priorityToEdit?.id}
        />
      )}

      {renderDeletePopup()}
    </>
  );
}
