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
  paymentDate?: Date;
  dueDate?: Date;
};

type FormCreateAction = {
  type: string;
  value: string | Date;
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
  dueDate: new Date(),
  paymentDate: new Date(),
};

const reducer = (
  state: FormCreateState,
  action: FormCreateAction
): FormCreateState => {
  switch (action.type) {
    case "nameExpense":
      return { ...state, nameExpense: action.value.toString() };
    case "status":
      return { ...state, status: action.value.toString() };
    case "methodPayment":
      return { ...state, methodPayment: action.value.toString() };
    case "priority":
      return { ...state, priority: action.value.toString() };
    case "whoPaid":
      return { ...state, whoPaid: action.value.toString() };
    case "category":
      return { ...state, category: action.value.toString() };
    case "month":
      return { ...state, month: action.value.toString() };
    case "year":
      return { ...state, year: action.value.toString() };
    case "dueDate":
      return { ...state, dueDate: new Date(action.value) };
    case "paymentDate":
      return { ...state, paymentDate: new Date(action.value) };
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
      if (type === "dueDate" || type === "paymentDate") {
        dispatch({ type, value: new Date(value) });
      } else {
        dispatch({ type, value });
      }
    };

  const createAction = (type: string) => (value: string | Date) => {
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
  const handleChangeDueDate = handleInputChange("dueDate");
  const handleChangePaymentDate = handleInputChange("paymentDate");

  const actions = {
    handleNameExpenses: createAction("nameExpense"),
    handleChangeStatus: createAction("status"),
    handleChangeMethodPayment: createAction("methodPayment"),
    handleChangePriority: createAction("priority"),
    handleChangeWhoPaid: createAction("whoPaid"),
    handleChangeCategory: createAction("category"),
    handleChangeMonth: createAction("month"),
    handleChangeYear: createAction("year"),
    handleChangeDueDate: createAction("dueDate"),
    handleChangePaymentDate: createAction("paymentDate"),
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
    handleChangeDueDate,
    handleChangePaymentDate,
  };
};

export default useFormCreate;
