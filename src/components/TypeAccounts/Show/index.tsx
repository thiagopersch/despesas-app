'use client';

import CTA from '@/components/CTA';
import ContainerTable from '@/components/ContainerTable';
import StatusIcon from '@/components/StatusTable';
import NoRow from '@/components/Table/NoRow';
import { useDeleteTypeAccountsWithConfirmation } from '@/hooks/useDeleteTypeAccountsWithConfirmation';
import { FormattedTypeAccounts, TypeAccounts } from '@/model/TypeAccounts';
import { listTypeAccounts } from '@/requests/queries/typeAccounts';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { Chip, Tooltip } from '@mui/material';
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
import EditTypeAccountsModal from '../Edit';

const ShowTypeAccounts = () => {
  const [rows, setRows] = React.useState<FormattedTypeAccounts[]>([]);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [TypeAccountsToEdit, setTypeAccountsToEdit] =
    React.useState<TypeAccounts>();
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );

  const {
    data: TypeAccounts,
    isLoading,
    refetch,
  } = useQuery<FormattedTypeAccounts[]>({
    queryKey: ['get-TypeAccounts'],
    queryFn: () => listTypeAccounts(),
  });

  React.useEffect(() => {
    if (TypeAccounts) {
      setRows(TypeAccounts);
    }
  }, [TypeAccounts]);

  const { data: session } = useSession();
  const { confirmDelete, renderDeletePopup } =
    useDeleteTypeAccountsWithConfirmation(session);

  const handleSaveClick = (id: GridRowId) => () => {
    const TypeAccountsToEdit = rows.find((row) => row.id === id);
    if (TypeAccountsToEdit) {
      setOpenPopup(true);
      setTypeAccountsToEdit(TypeAccountsToEdit);
    }
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    try {
      const TypeAccountsToDelete = rows.find((row) => row.id === id);
      if (TypeAccountsToDelete) {
        confirmDelete(TypeAccountsToDelete);
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
    { field: 'bank_code', headerName: 'Código', width: 200 },
    { field: 'bank_name', headerName: 'Nome', width: 200 },
    {
      field: 'bank_type',
      headerName: 'Tipo da conta',
      width: 200,
    },
    {
      field: 'bank_color',
      headerName: 'Cor',
      width: 200,
      renderCell: (params) => {
        console.log(params);
        return (
          <Chip
            style={{
              backgroundColor: params.value,
              color: '#FFFFFF',
              width: '100%',
              textShadow: '0rem 0rem 0.5rem #000000',
            }}
            label={params.value}
          />
        );
      },
    },
    {
      field: 'status',
      headerName: 'Situação',
      width: 120,

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
          <Link href={`/type-accounts/create`}>
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
              sortModel: [{ field: 'bank_name', sort: 'asc' }],
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
        <EditTypeAccountsModal
          handleClose={() => setOpenPopup(false)}
          typeAccounts={TypeAccountsToEdit}
          id={TypeAccountsToEdit?.id}
        />
      )}

      {renderDeletePopup()}
    </>
  );
};

export default ShowTypeAccounts;
