'use client';

import { useDeleteCategoryWithConfirmation } from '@/hooks/useDeleteCategoryWithConfirmation';
import { Category, FormattedCategory } from '@/model/Category';
import { listcategories } from '@/requests/queries/categories';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomId,
  randomTraderName,
  randomUpdatedDate,
} from '@mui/x-data-grid-generator';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import CTA from '../CTA';
import EditCategoryModal from '../Category';
import ContainerTable from '../ContainerTable';
import NoRow from '../Table/NoRow';

const initialRows: GridRowsProp = [
  {
    id: randomId(),
    name: randomTraderName(),
    created: randomCreatedDate(),
    updated: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    created: randomCreatedDate(),
    updated: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    created: randomCreatedDate(),
    updated: randomUpdatedDate(),
  },
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer
      sx={{ display: 'flex', margin: '1rem', justifyContent: 'flex-end' }}
    >
      <Button
        variant="contained"
        color="success"
        startIcon={<AddIcon />}
        onClick={handleClick}
      >
        Adicionar
      </Button>
    </GridToolbarContainer>
  );
}

const TableCategories = () => {
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
  const router = useRouter();

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const columns: GridColDef[] = [
    { field: 'image', headerName: 'Imagem', width: 200, editable: false },
    { field: 'name', headerName: 'Nome', width: 350, editable: false },
    {
      field: 'created',
      headerName: 'Criado em',
      type: 'dateTime',
      width: 350,
      editable: false,
    },
    {
      field: 'updated',
      headerName: 'Atualizado em',
      type: 'dateTime',
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

export default TableCategories;
