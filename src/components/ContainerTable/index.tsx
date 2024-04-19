import * as S from "./styles";

type ContainerTableProps = {
  children?: React.ReactNode;
};

const ContainerTable = ({ children }: ContainerTableProps) => {
  return <S.Wrapper>{children}</S.Wrapper>;
};

export default ContainerTable;
