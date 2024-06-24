'use client';

import CTA from '@/components/CTA';
import StatusIcon from '@/components/StatusTable';
import NoRow from '@/components/Table/NoRow';
import { useDeleteYearsWithConfirmation } from '@/hooks/useDeleteYearsWithConfirmation';
import { FormattedYear, Year } from '@/model/Year';
import { ListYears } from '@/requests/queries/years';
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
import EditYearsModal from '../Edit';

export default function ShowYear() {
  const [rows, setRows] = React.useState<FormattedYear[]>([]);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [yearToEdit, setYearToEdit] = React.useState<Year>();
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );

  const {
    data: year,
    isError,
    isLoading,
    refetch,
  } = useQuery<FormattedYear[]>({
    queryKey: ['get-year'],
    queryFn: () => ListYears(),
  });

  React.useEffect(() => {
    if (year) setRows(year);
  });

  const { data: session } = useSession();

  const { confirmDelete, renderDeletePopup } =
    useDeleteYearsWithConfirmation(session);

  const handleEditClick = (id: GridRowId) => () => {
    const yearToEdit = rows.find((row) => row.id === id);
    if (yearToEdit) {
      setOpenPopup(true);
      setYearToEdit(yearToEdit);
    }
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    try {
      const yearToDelete = rows.find((row) => row.id === id);
      if (yearToDelete) {
        confirmDelete(yearToDelete);
        const updatedRows = rows.filter((row) => row.id !== id);
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
    { field: 'year', headerName: 'Ano', width: 250, editable: false },
    {
      field: 'status',
      headerName: 'Situação',
      width: 250,
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
      width: 230,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(id)}
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
          <Link href="/years/create">
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
              sortModel: [{ field: 'year', sort: 'asc' }],
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
        <EditYearsModal
          handleClose={() => setOpenPopup(false)}
          years={yearToEdit}
          id={yearToEdit?.id}
        />
      )}

      {renderDeletePopup()}
    </>
  );
}
