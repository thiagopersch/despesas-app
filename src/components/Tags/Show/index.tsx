'use client';

import CTA from '@/components/CTA';
import ContainerTable from '@/components/ContainerTable';
import StatusIcon from '@/components/StatusTable';
import NoRow from '@/components/Table/NoRow';
import { useDeleteTagsWithConfirmation } from '@/hooks/useDeleteTagsWithConfirmation';
import { FormattedTags, Tags } from '@/model/Tags';
import { listTags } from '@/requests/queries/tags';
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
import EditTagsModal from '../Edit';

const ShowTags = () => {
  const [rows, setRows] = React.useState<FormattedTags[]>([]);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [TagsToEdit, setTagsToEdit] = React.useState<Tags>();
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );

  const {
    data: Tags,
    isError,
    isLoading,
    refetch,
  } = useQuery<FormattedTags[]>({
    queryKey: ['get-Tags'],
    queryFn: () => listTags(),
  });

  React.useEffect(() => {
    if (Tags) {
      setRows(Tags);
    }
  }, [Tags]);

  const { data: session } = useSession();
  const { confirmDelete, renderDeletePopup } =
    useDeleteTagsWithConfirmation(session);

  const handleSaveClick = (id: GridRowId) => () => {
    const TagsToEdit = rows.find((row) => row.id === id);
    if (TagsToEdit) {
      setOpenPopup(true);
      setTagsToEdit(TagsToEdit);
    }
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    try {
      const TagsToDelete = rows.find((row) => row.id === id);
      if (TagsToDelete) {
        confirmDelete(TagsToDelete);
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

  return (
    <>
      <ContainerTable>
        <CTA>
          <Link href={`/tags/create`}>
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
        <EditTagsModal
          handleClose={() => setOpenPopup(false)}
          tags={TagsToEdit}
          id={TagsToEdit?.id}
        />
      )}

      {renderDeletePopup()}
    </>
  );
};

export default ShowTags;
