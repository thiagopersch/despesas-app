import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useReducer } from "react";

type FormCreateState = {
  nameExpense: string;
  status: string;
  methodPayment: string;
  priority: string;
  whoPaid: string;
  category: string;
  month: string;
  year: string;
};

type FormCreateActions = {
  [key: string]: (value: string) => void;
};

const initialState: FormCreateState = {
  nameExpense: "",
  status: "",
  methodPayment: "",
  priority: "",
  whoPaid: "",
  category: "",
  month: "",
  year: "",
};

const reducer = (
  state: FormCreateState,
  action: { type: string; value: string }
) => {
  switch (action.type) {
    case "nameExpense":
      return { ...state, nameExpense: action.value };
    case "status":
      return { ...state, status: action.value };
    case "methodPayment":
      return { ...state, methodPayment: action.value };
    case "priority":
      return { ...state, priority: action.value };
    case "whoPaid":
      return { ...state, whoPaid: action.value };
    case "category":
      return { ...state, category: action.value };
    case "month":
      return { ...state, month: action.value };
    case "year":
      return { ...state, year: action.value };
    default:
      return state;
  }
};

const useFormCreate = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange =
    (type: string) =>
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
    ) => {
      const value = e.target.value;
      dispatch({ type, value });
    };

  const createAction = (type: string) => (value: string) => {
    dispatch({ type, value });
  };
  const handleNameExpenses = handleInputChange("nameExpense");
  const handleChangeStatus = handleInputChange("status");
  const handleChangeMethodPayment = handleInputChange("methodPayment");
  const handleChangePriority = handleInputChange("priority");
  const handleChangeWhoPaid = handleInputChange("whoPaid");
  const handleChangeCategory = handleInputChange("category");
  const handleChangeMonth = handleInputChange("month");
  const handleChangeYear = handleInputChange("year");

  const actions: FormCreateActions = {
    handleNameExpenses: createAction("nameExpense"),
    handleChangeStatus: createAction("status"),
    handleChangeMethodPayment: createAction("methodPayment"),
    handleChangePriority: createAction("priority"),
    handleChangeWhoPaid: createAction("whoPaid"),
    handleChangeCategory: createAction("category"),
    handleChangeMonth: createAction("month"),
    handleChangeYear: createAction("year"),
  };

  return {
    state,
    actions,
    handleNameExpenses,
    handleChangeStatus,
    handleChangeMethodPayment,
    handleChangePriority,
    handleChangeWhoPaid,
    handleChangeCategory,
    handleChangeMonth,
    handleChangeYear,
  };
};

export default useFormCreate;
