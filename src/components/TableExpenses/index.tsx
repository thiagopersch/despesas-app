"use client";

import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
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
  GridToolbarContainer,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomId,
  randomInt,
  randomPrice,
  randomTraderName,
  randomUpdatedDate,
  randomUserName,
} from "@mui/x-data-grid-generator";
import Link from "next/link";
import * as React from "react";
import ContainerTable from "../ContainerTable";

import * as S from "./styles";

const initialRows: GridRowsProp = [
  {
    id: randomId(),
    name: randomTraderName(),
    status: randomUserName(),
    amountToPay: randomPrice(0, 9999999).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    }),
    amountPaid: randomPrice(0, 9999999).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    }),
    portion: randomInt(1, 12),
    paymentToDate: randomCreatedDate().toLocaleString("pt-BR"),
    dueDate: randomCreatedDate().toLocaleString("pt-BR"),
    methodsPayment: randomUserName(),
    priority: randomUserName(),
    whoPaid: randomTraderName(),
    category: randomUserName(),
    months: randomCreatedDate().toLocaleString("pt-BR", { month: "long" }),
    years: randomCreatedDate().toLocaleString("pt-BR", { year: "numeric" }),
    created: randomCreatedDate(),
    updated: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    status: randomUserName(),
    amountToPay: randomPrice(0, 9999999).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    }),
    amountPaid: randomPrice(0, 9999999).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    }),
    portion: randomInt(1, 12),
    paymentToDate: randomCreatedDate().toLocaleString("pt-BR"),
    dueDate: randomCreatedDate().toLocaleString("pt-BR"),
    methodsPayment: randomUserName(),
    priority: randomUserName(),
    whoPaid: randomTraderName(),
    category: randomUserName(),
    months: randomCreatedDate().toLocaleString("pt-BR", { month: "long" }),
    years: randomCreatedDate().toLocaleString("pt-BR", { year: "numeric" }),
    created: randomCreatedDate(),
    updated: randomUpdatedDate(),
  },
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <Link href="/expenses/create">
      <GridToolbarContainer
        sx={{ display: "flex", margin: "1rem", justifyContent: "flex-end" }}
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
    </Link>
  );
}

export default function TableExpenses() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
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
    { field: "name", headerName: "Nome", width: 200, editable: true },
    { field: "status", headerName: "Status", width: 200, editable: true },
    {
      field: "amountToPay",
      headerName: "Valor à pagar",
      width: 200,
      editable: true,
    },
    {
      field: "amountPaid",
      headerName: "Valor pago",
      width: 200,
      editable: true,
    },
    {
      field: "portion",
      headerName: "Parcela",
      width: 200,
      editable: true,
    },
    {
      field: "paymentToDate",
      headerName: "Data de pagamento",
      width: 200,
      editable: true,
    },
    {
      field: "dueDate",
      headerName: "Data de vencimento",
      width: 200,
      editable: true,
    },
    {
      field: "methodsPayment",
      headerName: "Métodos de pagamento",
      width: 200,
      editable: true,
    },
    {
      field: "priority",
      headerName: "Prioridade",
      width: 200,
      editable: true,
    },
    {
      field: "whoPaid",
      headerName: "Quem pagou?",
      width: 200,
      editable: true,
    },
    {
      field: "category",
      headerName: "Categoria",
      width: 200,
      editable: true,
    },
    {
      field: "months",
      headerName: "Meses",
      width: 200,
      editable: true,
    },
    {
      field: "years",
      headerName: "Anos",
      width: 200,
      editable: true,
    },
    {
      field: "created",
      headerName: "Criado em",
      type: "dateTime",
      width: 230,
      editable: true,
    },
    {
      field: "updated",
      headerName: "Atualizado em",
      type: "dateTime",
      width: 230,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Ações",
      width: 230,
      cellClassName: "actions",
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
      <Link href="/expenses/create">
        <S.CTA>
          <Button color="success" variant="contained">
            Criar despesa
          </Button>
        </S.CTA>
      </Link>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        checkboxSelection
        autoHeight
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20, 50, 100]}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </ContainerTable>
  );
}
