'use client';

import CTA from '@/components/CTA';
import ContainerTable from '@/components/ContainerTable';
import StatusIcon from '@/components/StatusTable';
import NoRow from '@/components/Table/NoRow';
import { useDeletePaymentMethodsWithConfirmation } from '@/hooks/useDeletePaymentMethodsWithConfirmation';
import {
  FormattedPaymentMethods,
  PaymentMethods,
} from '@/model/PaymentMethods';
import { ListPaymentMethods } from '@/requests/queries/paymentMethods';
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
import EditPaymentMethodsModal from '../Edit';

export default function ShowPaymentMethods() {
  const [rows, setRows] = React.useState<FormattedPaymentMethods[]>([]);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [paymentMethodsToEdit, setPaymentMethodsToEdit] =
    React.useState<PaymentMethods>();
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );

  const {
    data: paymentMethods,
    isError,
    isLoading,
    refetch,
  } = useQuery<FormattedPaymentMethods[]>({
    queryKey: ['get-paymentMethods'],
    queryFn: () => ListPaymentMethods(),
  });

  React.useEffect(() => {
    if (paymentMethods) setRows(paymentMethods);
  });

  const { data: session } = useSession();
  const { confirmDelete, renderDeletePopup } =
    useDeletePaymentMethodsWithConfirmation(session);

  const handleEditClick = (id: GridRowId) => () => {
    const paymentMethodsToEdit = rows.find((row) => row.id === id);

    if (paymentMethodsToEdit) {
      setOpenPopup(true);
      setPaymentMethodsToEdit(paymentMethodsToEdit);
    }
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    try {
      const paymentMethodsToDelete = rows.find((row) => row.id === id);

      if (paymentMethodsToDelete) {
        confirmDelete(paymentMethodsToDelete);
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
    { field: 'name', headerName: 'Nome', width: 350, editable: false },
    {
      field: 'status',
      headerName: 'Situação',
      width: 350,
      editable: false,
      renderCell: (params) => {
        return <StatusIcon status={params.value} />;
      },
    },
    {
      field: 'formattedCreatedAt',
      headerName: 'Criado em',
      type: 'string',
      width: 230,
      editable: false,
    },
    {
      field: 'formattedUpdatedAt',
      headerName: 'Atualizado em',
      type: 'string',
      width: 230,
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
          <Link href="/paymentMethods/create">
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
        <EditPaymentMethodsModal
          handleClose={() => setOpenPopup(false)}
          paymentMethods={paymentMethodsToEdit}
          id={paymentMethodsToEdit?.id}
        />
      )}

      {renderDeletePopup()}
    </>
  );
}
