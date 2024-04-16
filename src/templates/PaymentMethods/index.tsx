import TablePaymentMethods from "@/components/TablePaymentMethods";
import TitleDefault from "@/components/TitleDefault";
import Base from "../Base";

export default function PaymentMethods() {
  return (
    <Base>
      <TitleDefault>Métodos de pagamento</TitleDefault>
      <TablePaymentMethods />
    </Base>
  );
}
