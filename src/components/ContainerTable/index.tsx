type ContainerTableProps = {
  children?: React.ReactNode;
};

const ContainerTable = ({ children }: ContainerTableProps) => {
  return (
    <div className="h-full w-full pb-32 md:px-20 lg:px-60">{children}</div>
  );
};

export default ContainerTable;
