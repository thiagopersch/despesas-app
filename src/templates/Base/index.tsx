import Navbar from "@/components/Navbar";

type BaseProps = {
  children?: React.ReactNode;
};

const Base = ({ children }: BaseProps) => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4">{children}</main>
    </>
  );
};

export default Base;
