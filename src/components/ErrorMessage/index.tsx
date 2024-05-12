import { Typography } from "@mui/material";

export type ErrorMessageProps = {
  children?: React.ReactNode;
};

const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <Typography variant="caption" color="error">
      {children}
    </Typography>
  );
};

export default ErrorMessage;
