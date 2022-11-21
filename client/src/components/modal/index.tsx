import { AiOutlineClose } from 'react-icons/ai';
import { colors } from '../../styles/theme';
import CreateProblemModal from './create';
import SearchProblemModal from './search';
import { ModalBackground, ModalCloseButton, ModalContainer, ModalInner } from './Style';

type MODAL_TYPE = 'create' | 'search';

interface Props {
  type: MODAL_TYPE;
  onToggle: () => void;
}

const ModalContent = {
  create: <CreateProblemModal />,
  search: <SearchProblemModal />,
};

const Modal = ({ type, onToggle }: Props) => {
  const children = ModalContent[type];

  return (
    <ModalContainer>
      <ModalInner>
        <ModalCloseButton onClick={onToggle}>
          <AiOutlineClose size={20} />
        </ModalCloseButton>
        {children}
      </ModalInner>
      <ModalBackground onClick={onToggle} />
    </ModalContainer>
  );
};

export default Modal;
