'use client';

import CTA from '@/components/CTA';
import ContainerTable from '@/components/ContainerTable';
import StatusIcon from '@/components/StatusTable';
import NoRow from '@/components/Table/NoRow';
import { useDeleteModulesWithConfirmation } from '@/hooks/useDeleteModulesWithConfirmation';
import { FormattedModules, Modules } from '@/model/Modules';
import { listModules } from '@/requests/queries/modules';
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
import EditModulesModal from '../Edit';

const ShowModules = () => {
  const [rows, setRows] = React.useState<FormattedModules[]>([]);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [ModulesToEdit, setModulesToEdit] = React.useState<Modules>();
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );

  const {
    data: Modules,
    isError,
    isLoading,
    refetch,
  } = useQuery<FormattedModules[]>({
    queryKey: ['get-Modules'],
    queryFn: () => listModules(),
  });

  React.useEffect(() => {
    if (Modules) {
      setRows(Modules);
    }
  }, [Modules]);

  const { data: session } = useSession();
  const { confirmDelete, renderDeletePopup } =
    useDeleteModulesWithConfirmation(session);

  const handleSaveClick = (id: GridRowId) => () => {
    const ModulesToEdit = rows.find((row) => row.id === id);
    if (ModulesToEdit) {
      setOpenPopup(true);
      setModulesToEdit(ModulesToEdit);
    }
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    try {
      const ModulesToDelete = rows.find((row) => row.id === id);
      if (ModulesToDelete) {
        confirmDelete(ModulesToDelete);
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
      width: 250,
    },
    {
      field: 'formattedUpdatedAt',
      headerName: 'Atualizado em',
      type: 'string',
      width: 250,
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
          <Link href={`/modules/create`}>
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
        <EditModulesModal
          handleClose={() => setOpenPopup(false)}
          modules={ModulesToEdit}
          id={ModulesToEdit?.id}
        />
      )}

      {renderDeletePopup()}
    </>
  );
};

export default ShowModules;
