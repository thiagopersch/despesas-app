'use client';

import { FormattedUsers, User } from '@/model/User';
import { listUsers } from '@/requests/queries/users';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Tooltip } from '@mui/material';
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

import ContainerTable from '@/components/ContainerTable';
import NoRow from '@/components/Table/NoRow';
import { useDeleteUserWithConfirmation } from '@/hooks/useDeleteUserWithConfirmation';
import { useRouter } from 'next/navigation';
import EditUserModal from '../Edit';
import { CTA } from './styles';

const ShowUsers = () => {
  const [rows, setRows] = React.useState<FormattedUsers[]>([]);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [userToEdit, setUserToEdit] = React.useState<User>();
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );

  const {
    data: users,
    isLoading,
    isError,
    refetch,
  } = useQuery<FormattedUsers[]>({
    queryKey: ['get-users'],
    queryFn: () => listUsers(),
  });

  React.useEffect(() => {
    if (users) {
      setRows(users);
    }
  }, [users]);

  const { data: session } = useSession();

  const { confirmDelete, renderDeletePopup } =
    useDeleteUserWithConfirmation(session);
  const router = useRouter();

  const handleSaveClick = (id: GridRowId) => async () => {
    const userToEdit = rows.find((row) => row.id === id);
    if (userToEdit) {
      setOpenPopup(true);
      setUserToEdit(userToEdit);
    }
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    try {
      const userToDelete = rows.find((row) => row.id === id);
      if (userToDelete) {
        confirmDelete(userToDelete);
        const updatedRows = rows.filter((row) => row.id !== id);
        setRows(updatedRows);
      }
    } catch (error) {
      console.error(error);
    } finally {
      refetch();
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', width: 350, editable: false },
    { field: 'login', headerName: 'Login', width: 350, editable: false },

    {
      field: 'formattedCreatedAt',
      headerName: 'Criado em',
      type: 'string',
      width: 350,
      editable: false,
    },
    {
      field: 'formattedUpdatedAt',
      headerName: 'Atualizado em',
      type: 'string',
      width: 350,
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

  if (isError) {
    return <div>Error loading data...</div>;
  }

  return (
    <>
      <ContainerTable>
        <CTA>
          <Link href="/users/create">
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
          checkboxSelection
          autoHeight
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
            sorting: {
              sortModel: [{ field: 'name', sort: 'asc' }],
            },
          }}
          pageSizeOptions={[10, 50, 100]}
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
        <EditUserModal
          handleClose={() => setOpenPopup(false)}
          user={userToEdit}
          id={userToEdit?.id}
        />
      )}

      {renderDeletePopup()}
    </>
  );
};

export default ShowUsers;
