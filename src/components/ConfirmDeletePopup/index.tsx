import { Button, Typography } from '@mui/material';
import { ReactNode } from 'react';
import * as S from './styles';

type ConfirmDeletePopupProps = {
  isOpen: boolean;
  onClose?: () => void;
  onConfirm?: (param: any) => void;
  message?: ReactNode;
  obj?: any;
};

const ConfirmDeletePopup = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}: ConfirmDeletePopupProps) => {
  if (!isOpen) return false;

  return (
    <S.Wrapper>
      <S.Content>
        <S.Title color="primary" fontWeight="bold">
          Confirmação de Deleção
        </S.Title>
        <Typography variant="inherit">{message}</Typography>
        <S.CTA>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Confirmar
          </Button>
        </S.CTA>
      </S.Content>
    </S.Wrapper>
  );
};

export default ConfirmDeletePopup;
