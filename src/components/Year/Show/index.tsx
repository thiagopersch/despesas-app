'use client';

import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridSlots,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomId,
  randomTraderName,
  randomUpdatedDate,
} from '@mui/x-data-grid-generator';
import * as React from 'react';
import ContainerTable from '../../ContainerTable';

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

export default function ShowYear() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );

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

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', width: 200, editable: true },
    {
      field: 'created',
      headerName: 'Criado em',
      type: 'dateTime',
      width: 230,
      editable: false,
    },
    {
      field: 'updated',
      headerName: 'Atualizado em',
      type: 'dateTime',
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
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Salvar"
              color="primary"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancelar"
              onClick={handleCancelClick(id)}
              color="error"
            />,
          ];
        }

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

  return (
    <ContainerTable>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="cell"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        checkboxSelection
        autoHeight
        slots={{
          toolbar: EditToolbar as GridSlots['toolbar'],
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </ContainerTable>
  );
}
