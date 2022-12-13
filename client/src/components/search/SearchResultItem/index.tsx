import { FiMoreHorizontal } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { ButtonContainer, ContentButtons, Infos, ItemExplain, ItemTitle, SaveButton, TestButton } from './Style';
import SearchWorkbookType from '../../../types/search';
import { saveWorkbook } from '../../../api/workbook';
import SearchResultContainer from '../../common/searchResultContainer';

const SearchResultItem = ({ workbookId, title, description, questionCount }: SearchWorkbookType) => {
  const navigate = useNavigate();
  const saveWorkbookMutation = useMutation(saveWorkbook);

  const handleMoveWorkbookView = () => {
    navigate(`./view?id=${workbookId}`); // 뒤로가기 했을때 리렌더링 되지 않도록
  };

  const handleTestButton = () => {
    navigate(`/workbook/${workbookId}`);
  };

  const handleSaveButton = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.stopPropagation();
    saveWorkbookMutation.mutate(
      {
        workbookId,
      },
      {
        onSuccess: () => {
          toast.success('문제집을 저장했습니다.');
        },
      },
    );
  };

  return (
    <SearchResultContainer handleClick={handleMoveWorkbookView}>
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
    </SearchResultContainer>
  );
};

export default SearchResultItem;
