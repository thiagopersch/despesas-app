'use client';

import TablePaymentMethods from '@/components/TablePaymentMethods';
import TitleDefault from '@/components/TitleDefault';

export default function PaymentMethods() {
  return (
    <>
      <TitleDefault>Métodos de pagamento</TitleDefault>
      <TablePaymentMethods />
    </>
  );
}
