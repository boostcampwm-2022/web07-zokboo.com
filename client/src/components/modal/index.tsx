import { AiOutlineClose } from 'react-icons/ai';
import { ModalBackground, ModalCloseButton, ModalContainer, ModalInner } from './Style';

interface Props {
  children: JSX.Element;
  onToggle: () => void;
}

const Modal = ({ children, onToggle }: Props) => {
  return (
    <ModalContainer>
      <ModalInner>
        <ModalCloseButton onClick={onToggle}>
          <AiOutlineClose size={20} />
        </ModalCloseButton>
        {children}
      </ModalInner>
      <ModalBackground />
    </ModalContainer>
  );
};

export default Modal;
