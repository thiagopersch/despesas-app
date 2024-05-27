import Navbar from '@/components/Navbar';

type BaseProps = {
  children?: React.ReactNode;
};

const Base = ({ children }: BaseProps) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Base;
