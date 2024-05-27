import { Typography } from '@mui/material';

type TitleDefaultProps = {
  children: string | React.ReactNode;
};

const TitleDefault = ({ children }: TitleDefaultProps) => {
  return (
    <Typography
      color="primary"
      variant="h3"
      className="font-bold my-10 flex flex-col justify-center items-center text-center"
    >
      {children}
    </Typography>
  );
};

export default TitleDefault;
