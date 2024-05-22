'use client';

import TableExpenses from '@/components/TableExpenses';
import TitleDefault from '@/components/TitleDefault';

export default function Expenses() {
  return (
    <>
      <TitleDefault>Despesas</TitleDefault>
      <TableExpenses />
    </>
  );
}
