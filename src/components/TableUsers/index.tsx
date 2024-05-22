'use client';

import { FormattedUsers, User } from '@/model/User';
import {
  useAddUserMutation,
  useDeleteUserMutation,
} from '@/requests/mutations/users';
import { listUsers } from '@/requests/queries/users';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Tooltip } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
} from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import * as React from 'react';
import ContainerTable from '../ContainerTable';
import NoRow from '../Table/NoRow';

import * as S from './styles';

type UserFormData = {
  name: string;
  login: string;
};

const TableUsers = () => {
  const [user, setUser] = React.useState<User>();
  const [rows, setRows] = React.useState<FormattedUsers[]>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );

  const {
    data: users,
    isLoading,
    isError,
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

  const mutation = useAddUserMutation();
  const { mutate: deleteUser } = useDeleteUserMutation();

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event,
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => async () => {
    const editedRow = rows.find((row) => row.id === id);
    if (editedRow) {
      try {
        mutation.mutate(
          {
            name: editedRow.name,
            login: editedRow.login,
          },
          {
            onSuccess() {},
          },
        );
        setRowModesModel({
          ...rowModesModel,
          [id]: { mode: GridRowModes.View },
        });
      } catch (error) {
        console.error('Error saving user:', error);
      }
    }
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    deleteUser(id, {
      onSuccess: () => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      },
    });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setUser(undefined);
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = (newRow: FormattedUsers) => {
    const updatedRow = { ...newRow, status: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', width: 200, editable: true },
    { field: 'login', headerName: 'Login', width: 300, editable: true },

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
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <Tooltip title="Salvar" key="save">
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Salvar"
                color="primary"
                onClick={handleSaveClick(id)}
              />
            </Tooltip>,
            <Tooltip title="Cancelar" key="cancel">
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancelar"
                onClick={handleCancelClick(id)}
                color="warning"
              />
            </Tooltip>,
          ];
        }

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
    <ContainerTable>
      <Link href="/users/create">
        <S.CTA>
          <Button variant="contained" color="success" size="large">
            Cadastrar
          </Button>
        </S.CTA>
      </Link>
      <DataGrid
        rows={rows}
        columns={columns}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        loading={isLoading}
        checkboxSelection
        autoHeight
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
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
  );
};

export default TableUsers;
