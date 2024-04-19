"use client";

import TableMonth from "@/components/TableMonth";
import TitleDefault from "@/components/TitleDefault";
import Base from "../Base";

const Month = () => {
  return (
    <Base>
      <TitleDefault>Meses</TitleDefault>
      <TableMonth />
    </Base>
  );
};

export default Month;
