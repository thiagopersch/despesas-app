import { Modal as ModalMUI, ModalProps } from "@mui/material";

export type ModalCustomizedProps = ModalProps & {
  children?: string;
  onClose: () => void;
};

const Modal = ({ children, onClose, ...props }: ModalCustomizedProps) => {
  return (
    <ModalMUI onClose={onClose} {...props}>
      {children}
    </ModalMUI>
  );
};

export default Modal;
