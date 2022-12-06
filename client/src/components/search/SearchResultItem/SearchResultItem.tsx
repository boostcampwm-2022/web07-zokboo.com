import { FiMoreHorizontal } from 'react-icons/fi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ButtonContainer,
  Buttons,
  ContentButtons,
  Heart,
  Infos,
  ItemExplain,
  ItemTitle,
  SaveButton,
  SearchResultItemContainer,
  TestButton,
} from './Style';
import SearchWorkbookType from '../../../types/search';

const SearchResultItem = ({ workbookId, title, description, questionCount }: SearchWorkbookType) => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLike = () => {
    if (isLike) {
      /** 좋아요 취소 api */
    } else {
      /** 좋아요 입력 api */
    }

    setIsLike((prev) => !prev);
  };

  const handleMoveWorkbookView = () => {
    navigate(`./view?id=${workbookId}`);
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
        <Buttons>
          <Heart type="button" onClick={handleLike}>
            {isLike ? <AiFillHeart className="fillStyled" /> : <AiOutlineHeart />}
          </Heart>
        </Buttons>
        <ContentButtons>
          <TestButton type="button" value="시험 응시하기" onClick={handleTestButton} />
          <SaveButton type="button" value="저장하기" onClick={handleSaveButton} />
        </ContentButtons>
      </ButtonContainer>
    </SearchResultItemContainer>
  );
};

export default SearchResultItem;
