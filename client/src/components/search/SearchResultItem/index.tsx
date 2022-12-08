import { FiMoreHorizontal } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import {
  ButtonContainer,
  ContentButtons,
  Infos,
  ItemExplain,
  ItemTitle,
  SaveButton,
  SearchResultItemContainer,
  TestButton,
} from './Style';
import SearchWorkbookType from '../../../types/search';

const SearchResultItem = ({ workbookId, title, description, questionCount }: SearchWorkbookType) => {
  const navigate = useNavigate();

  const handleMoveWorkbookView = () => {
    navigate(`./view?id=${workbookId}`); // 뒤로가기 했을때 리렌더링 되지 않도록
  };

  const handleTestButton = () => {
    alert('시험 응시 뻐튼');
  };

  const handleSaveButton = () => {
    alert('문제집 저장 뻐튼');
  };

  return (
    <SearchResultItemContainer onClick={handleMoveWorkbookView}>
      <FiMoreHorizontal className="more-button" />
      <ItemTitle>{title}</ItemTitle>
      <ItemExplain>{description}</ItemExplain>
      <Infos>{`문제 수 : ${questionCount}`}</Infos>
      <ButtonContainer>
        <ContentButtons>
          <TestButton type="button" value="시험 응시하기" onClick={handleTestButton} />
          <SaveButton type="button" value="저장하기" onClick={handleSaveButton} />
        </ContentButtons>
      </ButtonContainer>
    </SearchResultItemContainer>
  );
};

export default SearchResultItem;
