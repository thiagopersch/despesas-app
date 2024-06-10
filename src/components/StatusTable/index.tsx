import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';

type StatusIconProps = {
  status: boolean;
};

const StatusIcon = ({ status }: StatusIconProps) => {
  if (status === true) {
    return (
      <Tooltip title="Ativado">
        <CheckCircleIcon color="success" />
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title="Desativado">
        <CloseIcon color="error" />
      </Tooltip>
    );
  }
};

export default StatusIcon;
