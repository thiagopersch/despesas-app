"use client";

import { Button, FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import useFormCreate from "@/hooks/useFormCreate";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { NumericFormat } from "react-number-format";
import * as S from "./styles";

type calcularParcelasProps = {
  valorTotal: number;
  numParcelas: number;
  mesInicial: number;
  anoInicial: number;
};

const FormCreate = ({ anoInicial, mesInicial }: calcularParcelasProps) => {
  const [amountToPay, setAmountToPay] = useState("");
  const [portion, setPortion] = useState("");

  const {
    state,
    handleChangeCategory,
    handleChangeMethodPayment,
    handleChangeMonth,
    handleChangePriority,
    handleChangeStatus,
    handleChangeWhoPaid,
    handleChangeYear,
    handleNameExpenses,
    handleChangeDueDate,
    handleChangePaymentDate,
  } = useFormCreate();

  const handleAmountToPay = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAmountToPay(e.target.value);
  };

  const handlePortion = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPortion(e.target.value);
  };

  const calculateParcelValue = () => {
    if (!amountToPay || !portion) return "0,00";

    const amount = parseFloat(amountToPay.replace(/\./g, "").replace(",", "."));
    const portions = parseInt(portion);

    if (isNaN(amount) || isNaN(portions) || portions === 0) return "0,00";

    return (amount / portions).toFixed(2).replace(".", ",");
  };

  const calculatePortions = () => {
    if (!amountToPay || !portion) return "0,00";

    const amount = parseFloat(amountToPay.replace(/\./g, "").replace(",", "."));
    const portions = parseInt(portion);

    if (isNaN(amount) || isNaN(portions) || portions === 0) return "0,00";

    const valorParcela = (amount / portions).toFixed(2).replace(".", ",");
    const parcelas = [];

    let dataParcela = new Date(
      new Date(state.year).getFullYear(),
      new Date(state.month).getMonth()
    );

    for (let i = 0; i < parseInt(portion); i++) {
      const parcela = {
        value: valorParcela,
        dueDate: new Date(dataParcela),
      };

      parcelas.push(parcela);

      dataParcela.setMonth(dataParcela.getMonth() + 1);
    }

    return parcelas;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const calculatedAmountPaid = calculateParcelValue();
    const data = {
      amountToPay,
      amountPaid: parseFloat(
        calculatedAmountPaid.replace(/\./g, "").replace(",", ".")
      ),
      portion,
      ...state,
    };

    console.log(data);

    const parcelas = calculatePortions();

    console.log("Parcelas calculadas:", parcelas);
  };

  return (
    <form onSubmit={handleSubmit}>
      <S.WrapperTitle>
        <Typography color="primary" variant="h5">
          Cadastrando a despesa
        </Typography>
      </S.WrapperTitle>

      <S.Fields>
        <TextField
          name="name"
          label="Nome da despesa"
          id="expense-name"
          type="text"
          variant="filled"
          value={state.nameExpense}
          onChange={handleNameExpenses}
          fullWidth
          required
        />
        <FormControl fullWidth required variant="filled">
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={state.status}
            label="Status"
            variant="filled"
            onChange={handleChangeStatus}
            required
            fullWidth
          >
            <MenuItem value="Não pago">Não pago</MenuItem>
            <MenuItem value="Em processamento">Em processamento</MenuItem>
            <MenuItem value="Pago">Pago</MenuItem>
          </Select>
        </FormControl>
      </S.Fields>

      <S.Fields>
        <NumericFormat
          decimalSeparator={`,`}
          thousandSeparator={`.`}
          decimalScale={2}
          allowNegative={false}
          customInput={TextField}
          fixedDecimalScale
          name="amountToPay"
          label="Valor à pagar"
          id="amountToPay"
          type="text"
          variant="filled"
          value={amountToPay}
          onChange={handleAmountToPay}
          fullWidth
          required
        />
        <NumericFormat
          decimalScale={0}
          allowNegative={false}
          customInput={TextField}
          fixedDecimalScale
          name="portion"
          label="Parcela"
          id="portion"
          type="text"
          variant="filled"
          value={portion}
          onChange={handlePortion}
          fullWidth
          required
        />
        <NumericFormat
          decimalSeparator={`,`}
          thousandSeparator={`.`}
          decimalScale={2}
          allowNegative={false}
          customInput={TextField}
          fixedDecimalScale
          name="amountPaid"
          label="Valor da parcela"
          id="amountPaid"
          type="text"
          variant="filled"
          value={calculateParcelValue()}
          fullWidth
          disabled
          required
        />
      </S.Fields>

      <S.Fields>
        <LocalizationProvider
          dateLibInstance={Dayjs}
          dateAdapter={AdapterDayjs}
        >
          <DatePicker
            name="paymentToDate"
            format="DD/MM/YYYY"
            defaultValue={dayjs(new Date())}
            label="Data de pagamento"
            slotProps={{
              textField: {
                variant: "filled",
                fullWidth: true,
              },
            }}
          />
        </LocalizationProvider>
        <LocalizationProvider
          dateLibInstance={Dayjs}
          dateAdapter={AdapterDayjs}
        >
          <DatePicker
            name="paymentToDue"
            format="DD/MM/YYYY"
            defaultValue={dayjs(new Date())}
            label="Data de vencimento"
            slotProps={{
              textField: {
                variant: "filled",
                fullWidth: true,
              },
            }}
          />
        </LocalizationProvider>
      </S.Fields>

      <S.Fields>
        <FormControl fullWidth required variant="filled">
          <InputLabel id="methodPayment">Forma de pagamento</InputLabel>
          <Select
            labelId="methodPayment"
            id="methodPayment"
            value={state.methodPayment}
            label="Forma de pagamento"
            variant="filled"
            onChange={handleChangeMethodPayment}
            required
            fullWidth
          >
            <MenuItem value="CC">Cartão de crédito</MenuItem>
            <MenuItem value="CD">Cartão de crédito</MenuItem>
            <MenuItem value="M">Dinheiro</MenuItem>
            <MenuItem value="P">Pix</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth required variant="filled">
          <InputLabel id="priority">Prioridade </InputLabel>
          <Select
            labelId="priority"
            id="priority"
            value={state.priority}
            label="Prioridade"
            variant="filled"
            onChange={handleChangePriority}
            required
            fullWidth
          >
            <MenuItem value="B">Baixa</MenuItem>
            <MenuItem value="M">Média</MenuItem>
            <MenuItem value="A">Alta</MenuItem>
            <MenuItem value="U">Urgente</MenuItem>
          </Select>
        </FormControl>
      </S.Fields>

      <S.Fields>
        <FormControl fullWidth required variant="filled">
          <InputLabel id="whoPaid">Quem pagou</InputLabel>
          <Select
            labelId="whoPaid"
            id="whoPaid"
            value={state.whoPaid}
            label="Quem pagou"
            variant="filled"
            onChange={handleChangeWhoPaid}
            required
            fullWidth
          >
            <MenuItem value="Pexe">Pexe</MenuItem>
            <MenuItem value="Taisvara">Taisvara</MenuItem>
            <MenuItem value="Sadriko">Sadriko</MenuItem>
            <MenuItem value="Saletão">Saletão</MenuItem>
            <MenuItem value="Racabao">Racabao</MenuItem>
            <MenuItem value="JN">JN</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth required variant="filled">
          <InputLabel id="category">Categoria</InputLabel>
          <Select
            labelId="category"
            id="category"
            value={state.category}
            label="Categoria"
            variant="filled"
            onChange={handleChangeCategory}
            required
            fullWidth
          >
            <MenuItem value="1">Academia</MenuItem>
            <MenuItem value="2">Alimentação</MenuItem>
            <MenuItem value="3">Banco</MenuItem>
            <MenuItem value="4">Despesas pessoais</MenuItem>
            <MenuItem value="5">Despesas de casa</MenuItem>
          </Select>
        </FormControl>
      </S.Fields>

      <S.Fields>
        <FormControl fullWidth required variant="filled">
          <InputLabel id="month">Mês inicial</InputLabel>
          <Select
            labelId="month"
            id="month"
            value={state.month}
            label="Mês inicial"
            variant="filled"
            onChange={handleChangeMonth}
            required
            fullWidth
          >
            <MenuItem value="1">Janeiro</MenuItem>
            <MenuItem value="2">Fevereiro</MenuItem>
            <MenuItem value="3">Março</MenuItem>
            <MenuItem value="4">Abril</MenuItem>
            <MenuItem value="5">Maio</MenuItem>
            <MenuItem value="6">Junho</MenuItem>
            <MenuItem value="7">Julho</MenuItem>
            <MenuItem value="8">Agosto</MenuItem>
            <MenuItem value="9">Setembro</MenuItem>
            <MenuItem value="10">Outubro</MenuItem>
            <MenuItem value="11">Novembro</MenuItem>
            <MenuItem value="12">Dezembro</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth required variant="filled">
          <InputLabel id="year">Ano inicial</InputLabel>
          <Select
            labelId="year"
            id="year"
            value={state.year}
            label="Ano inicial"
            variant="filled"
            onChange={handleChangeYear}
            required
            fullWidth
          >
            <MenuItem value="2023">2023</MenuItem>
            <MenuItem value="2024">2024</MenuItem>
            <MenuItem value="2025">2025</MenuItem>
            <MenuItem value="2026">2026</MenuItem>
          </Select>
        </FormControl>
      </S.Fields>

      <S.CTA>
        <Link href="/expenses">
          <Button type="reset" variant="outlined" color="success">
            Cancelar
          </Button>
        </Link>
        <Button type="submit" variant="contained" color="success">
          Cadastrar
        </Button>
      </S.CTA>
    </form>
  );
};

export default FormCreate;
