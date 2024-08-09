'use client';

import CTA from '@/components/CTA';
import ContainerTable from '@/components/ContainerTable';

import StatusIcon from '@/components/StatusTable';
import NoRow from '@/components/Table/NoRow';
import { useDeleteSituationWithConfirmation } from '@/hooks/useDeleteSituationWithConfirmation';
import { FormattedSituation, Situation } from '@/model/Situation';
import { listSituation } from '@/requests/queries/situation';
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
import EditSituationModal from '../Edit';

const ShowSituation = () => {
  const [rows, setRows] = React.useState<FormattedSituation[]>([]);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [SituationToEdit, setSituationToEdit] = React.useState<Situation>();
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );

  const {
    data: Situation,
    isLoading,
    refetch,
  } = useQuery<FormattedSituation[]>({
    queryKey: ['get-Situation'],
    queryFn: () => listSituation(),
  });

  React.useEffect(() => {
    if (Situation) {
      setRows(Situation);
    }
  }, [Situation]);

  const { data: session } = useSession();
  const { confirmDelete, renderDeletePopup } =
    useDeleteSituationWithConfirmation(session);

  const handleSaveClick = (id: GridRowId) => () => {
    const SituationToEdit = rows.find((row) => row.id === id);
    if (SituationToEdit) {
      setOpenPopup(true);
      setSituationToEdit(SituationToEdit);
    }
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    try {
      const SituationToDelete = rows.find((row) => row.id === id);
      if (SituationToDelete) {
        confirmDelete(SituationToDelete);
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
    { field: 'name', headerName: 'Nome', width: 200 },
    {
      field: 'color',
      headerName: 'Color',
      width: 200,
      renderCell(params) {
        return (
          <Chip
            style={{
              color: 'white',
              backgroundColor: params.value,
              width: '100%',
            }}
            label={params.value}
          >
            {params.value}
          </Chip>
        );
      },
    },
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
          <Link href={`/situation/create`}>
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
        <EditSituationModal
          handleClose={() => setOpenPopup(false)}
          situation={SituationToEdit}
          id={SituationToEdit?.id}
        />
      )}

      {renderDeletePopup()}
    </>
  );
};

export default ShowSituation;
