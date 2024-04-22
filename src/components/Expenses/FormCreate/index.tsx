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
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import * as S from "./styles";

const FormCreate = () => {
  const [amountToPay, setAmountToPay] = useState("");
  const [portion, setPortion] = useState("");
  const [parcelas, setParcelas] = useState<{ value: string; date: Dayjs }[]>(
    []
  );
  const [paymentDate, setPaymentDate] = useState<Dayjs | null>();
  const [dueDate, setDueDate] = useState<Dayjs | null>(dayjs(new Date()));

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
  } = useFormCreate();

  useEffect(() => {
    calculatePortions();
  }, [amountToPay, portion, dueDate, paymentDate]);

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

  const handlePaymentDateChange = (newValue: Dayjs | null) => {
    setPaymentDate(newValue);
  };

  const handleDueDateChange = (newValue: Dayjs | null) => {
    setDueDate(newValue);
  };

  const calculateParcelValue = () => {
    if (!amountToPay || !portion) return "0,00";

    const amount = parseFloat(amountToPay.replace(/\./g, "").replace(",", "."));
    const portions = parseInt(portion);

    if (isNaN(amount) || isNaN(portions) || portions === 0) return "0,00";

    return (amount / portions).toFixed(2).replace(".", ",");
  };

  const calculatePortions = () => {
    if (!amountToPay || !portion) return 0;

    const amount = parseFloat(amountToPay.replace(/\./g, "").replace(",", "."));
    const portions = parseInt(portion);
    const selectedDueDate = state.dueDate;

    if (isNaN(amount) || isNaN(portions) || portions === 0) return 0;

    const parcelasCalculadas: { value: string; date: Dayjs }[] = [];

    let dataParcela = dayjs(selectedDueDate).startOf("month");
    const months = Math.ceil(portions / 12);
    let totalMonths = 0;

    for (let i = 0; i < months; i++) {
      const parcelasNoAno = Math.min(portions - i * 12, 12);
      const valorParcelaNoAno = (amount / portions)
        .toFixed(2)
        .replace(".", ",");

      for (let j = 0; j < parcelasNoAno; j++) {
        const parcela = {
          value: valorParcelaNoAno,
          date: dataParcela.clone(),
        };

        parcelasCalculadas.push(parcela);

        dataParcela = dataParcela.add(1, "month");
        totalMonths++;
      }

      if (dataParcela.month() === 0) {
        dataParcela = dataParcela.add(1, "year");
      }
    }

    setParcelas(parcelasCalculadas);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const calculatedAmountPaid = calculateParcelValue();

    const formattedDueDate = dueDate?.format("YYYY-MM-DD");
    const formattedPaymentDate = paymentDate?.format("YYYY-MM-DD");

    const formattedParcels = parcelas.map((parcela) => ({
      value: parcela.value,
      date: parcela.date.format(`YYYY-MM-${dayjs(dueDate).format("DD")}`),
    }));

    const data = {
      ...state,
      amountToPay,
      amountPaid: parseFloat(
        calculatedAmountPaid.replace(/\./g, "").replace(",", ".")
      ),
      portion,
      parcelas: {
        portions: formattedParcels,
      },
      dueDate: formattedDueDate,
      paymentDate: formattedPaymentDate,
    };

    console.log(data);

    console.log(formattedParcels);
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
        />
        <FormControl fullWidth variant="filled">
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={state.status}
            label="Status"
            variant="filled"
            onChange={handleChangeStatus}
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
            value={paymentDate}
            onChange={handlePaymentDateChange}
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
            name="dueDate"
            format="DD/MM/YYYY"
            value={dueDate}
            onChange={handleDueDateChange}
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
        <FormControl fullWidth variant="filled">
          <InputLabel id="methodPayment">Forma de pagamento</InputLabel>
          <Select
            labelId="methodPayment"
            id="methodPayment"
            value={state.methodPayment}
            label="Forma de pagamento"
            variant="filled"
            onChange={handleChangeMethodPayment}
            fullWidth
          >
            <MenuItem value="CC">Cartão de crédito</MenuItem>
            <MenuItem value="CD">Cartão de crédito</MenuItem>
            <MenuItem value="M">Dinheiro</MenuItem>
            <MenuItem value="P">Pix</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth variant="filled">
          <InputLabel id="priority">Prioridade </InputLabel>
          <Select
            labelId="priority"
            id="priority"
            value={state.priority}
            label="Prioridade"
            variant="filled"
            onChange={handleChangePriority}
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
        <FormControl fullWidth variant="filled">
          <InputLabel id="whoPaid">Quem pagou</InputLabel>
          <Select
            labelId="whoPaid"
            id="whoPaid"
            value={state.whoPaid}
            label="Quem pagou"
            variant="filled"
            onChange={handleChangeWhoPaid}
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

        <FormControl fullWidth variant="filled">
          <InputLabel id="category">Categoria</InputLabel>
          <Select
            labelId="category"
            id="category"
            value={state.category}
            label="Categoria"
            variant="filled"
            onChange={handleChangeCategory}
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
        <FormControl fullWidth variant="filled">
          <InputLabel id="month">Mês inicial</InputLabel>
          <Select
            labelId="month"
            id="month"
            value={state.month}
            label="Mês inicial"
            variant="filled"
            onChange={handleChangeMonth}
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

        <FormControl fullWidth variant="filled">
          <InputLabel id="year">Ano inicial</InputLabel>
          <Select
            labelId="year"
            id="year"
            value={state.year}
            label="Ano inicial"
            variant="filled"
            onChange={handleChangeYear}
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
