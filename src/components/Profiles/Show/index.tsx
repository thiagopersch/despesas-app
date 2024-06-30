'use client';

import CTA from '@/components/CTA';
import ContainerTable from '@/components/ContainerTable';
import StatusIcon from '@/components/StatusTable';
import NoRow from '@/components/Table/NoRow';
import { useDeleteProfilesWithConfirmation } from '@/hooks/useDeleteProfilesWithConfirmation';
import { FormattedProfiles, Profiles } from '@/model/Profiles';
import { listProfiles } from '@/requests/queries/profiles';
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
import EditProfilesModal from '../Edit';

const ShowProfiles = () => {
  const [rows, setRows] = React.useState<FormattedProfiles[]>([]);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [ProfilesToEdit, setProfilesToEdit] = React.useState<Profiles>();
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );

  const {
    data: Profiles,
    isLoading,
    refetch,
  } = useQuery<FormattedProfiles[]>({
    queryKey: ['get-Profiles'],
    queryFn: () => listProfiles(),
  });

  React.useEffect(() => {
    if (Profiles) {
      setRows(Profiles);
    }
  }, [Profiles]);

  const { data: session } = useSession();
  const { confirmDelete, renderDeletePopup } =
    useDeleteProfilesWithConfirmation(session);

  const handleSaveClick = (id: GridRowId) => () => {
    const ProfilesToEdit = rows.find((row) => row.id === id);
    if (ProfilesToEdit) {
      setOpenPopup(true);
      setProfilesToEdit(ProfilesToEdit);
    }
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    try {
      const ProfilesToDelete = rows.find((row) => row.id === id);
      if (ProfilesToDelete) {
        confirmDelete(ProfilesToDelete);
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
    { field: 'code', headerName: 'Código', width: 200 },
    { field: 'name', headerName: 'Nome', width: 200 },
    {
      field: 'status',
      headerName: 'Situação',
      width: 200,

      renderCell: (params) => {
        return <StatusIcon status={params.value} />;
      },
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
          <Link href={`/profiles/create`}>
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
        <EditProfilesModal
          handleClose={() => setOpenPopup(false)}
          profiles={ProfilesToEdit}
          id={ProfilesToEdit?.id}
        />
      )}

      {renderDeletePopup()}
    </>
  );
};

export default ShowProfiles;
