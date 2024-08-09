'use client';

import CTA from '@/components/CTA';
import ContainerTable from '@/components/ContainerTable';
import StatusIcon from '@/components/StatusTable';
import NoRow from '@/components/Table/NoRow';
import { useDeleteCategoryWithConfirmation } from '@/hooks/useDeleteCategoryWithConfirmation';
import { Category, FormattedCategory } from '@/model/Category';
import { listcategories } from '@/requests/queries/categories';
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
import EditCategoryModal from '../Edit';

const ShowCategory = () => {
  const [rows, setRows] = React.useState<FormattedCategory[]>([]);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [categoryToEdit, setCategoryToEdit] = React.useState<Category>();
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );

  const {
    data: categories,
    isError,
    isLoading,
    refetch,
  } = useQuery<FormattedCategory[]>({
    queryKey: ['get-categories'],
    queryFn: () => listcategories(),
  });

  React.useEffect(() => {
    if (categories) {
      setRows(categories);
    }
  }, [categories]);

  const { data: session } = useSession();
  const { confirmDelete, renderDeletePopup } =
    useDeleteCategoryWithConfirmation(session);

  const handleSaveClick = (id: GridRowId) => () => {
    const categoryToEdit = rows.find((row) => row.id === id);
    if (categoryToEdit) {
      setOpenPopup(true);
      setCategoryToEdit(categoryToEdit);
    }
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    try {
      const categoryToDelete = rows.find((row) => row.id === id);
      if (categoryToDelete) {
        confirmDelete(categoryToDelete);
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
          <Link href="/category/create">
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
        <EditCategoryModal
          handleClose={() => setOpenPopup(false)}
          category={categoryToEdit}
          id={categoryToEdit?.id}
        />
      )}

      {renderDeletePopup()}
    </>
  );
};

export default ShowCategory;
