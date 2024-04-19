"use client";

import TableCategories from "@/components/TableCategories";
import TitleDefault from "@/components/TitleDefault";
import Base from "../Base";

export default function Category() {
  return (
    <Base>
      <TitleDefault>Categorias</TitleDefault>
      <TableCategories />
    </Base>
  );
}
