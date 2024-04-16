import TableExpenses from "@/components/TableExpenses";
import TitleDefault from "@/components/TitleDefault";
import Base from "../Base";

export default function Expenses() {
  return (
    <Base>
      <TitleDefault>Despesas</TitleDefault>
      <TableExpenses />
    </Base>
  );
}
