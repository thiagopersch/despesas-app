import TableUsers from "@/components/TableUsers";
import TitleDefault from "@/components/TitleDefault";
import Base from "../Base";

export default function Users() {
  return (
    <Base>
      <TitleDefault>Usuários</TitleDefault>
      <TableUsers />
    </Base>
  );
}
