import { AiOutlineClose } from 'react-icons/ai';
import { Problem } from '../../types/workbook';
import CreateProblemModal from './create';
import SearchProblemModal from './search';
import { ModalBackground, ModalCloseButton, ModalContainer, ModalInner } from './Style';

type MODAL_TYPE = 'create' | 'search';

interface Props {
  type: MODAL_TYPE;
  onToggle: () => void;
  handleProblemAdd: (problem: Problem) => void;
}

const Modal = ({ type, onToggle, handleProblemAdd }: Props) => {
  return (
    <ModalContainer>
      <ModalInner>
        <ModalCloseButton onClick={onToggle}>
          <AiOutlineClose size={20} />
        </ModalCloseButton>
        {type === 'create' && <CreateProblemModal handleProblemAdd={handleProblemAdd} />}
        {type === 'search' && <SearchProblemModal handleProblemAdd={handleProblemAdd} />}
      </ModalInner>
      <ModalBackground onClick={onToggle} />
    </ModalContainer>
  );
};

export default Modal;
