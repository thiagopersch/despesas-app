import { Typography } from "@mui/material";

type TitleDefaultProps = {
  children: string | React.ReactNode;
};

const TitleDefault = ({ children }: TitleDefaultProps) => {
  return (
    <div className="my-20 flex flex-col justify-center items-center text-center">
      <Typography color="primary" variant="h3" className="font-bold">
        {children}
      </Typography>
    </div>
  );
};

export default TitleDefault;
