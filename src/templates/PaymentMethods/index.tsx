'use client';

import ShowPaymentMethods from '@/components/PaymentMethods/Show';
import TitleDefault from '@/components/TitleDefault';

export default function PaymentMethods() {
  return (
    <>
      <TitleDefault>Métodos de pagamento</TitleDefault>
      <ShowPaymentMethods />
    </>
  );
}
