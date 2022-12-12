import { FiMoreHorizontal } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import React, { useState } from 'react';
import {
  ButtonContainer,
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
  const navigate = useNavigate();
  const [isHeart, setIsHeart] = useState(false);

  const handleMoveWorkbookView = () => {
    navigate(`./view?id=${workbookId}`); // 뒤로가기 했을때 리렌더링 되지 않도록
  };

  const handleHeartButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (isHeart) {
      /** 좋아요 취소 api */
      alert('좋아요를 취소하였습니다.');
    } else {
      /** 좋아요 입력 api */
      alert('좋아요를 눌렀습니다.');
    }

    setIsHeart((prev) => !prev);
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
        <Heart type="button" onClick={handleHeartButton}>
          {isHeart ? <AiFillHeart size={20} /> : <AiOutlineHeart size={20} />}
        </Heart>
        <ContentButtons>
          <TestButton type="button" value="시험 응시하기" onClick={handleTestButton} />
          <SaveButton type="button" value="저장하기" onClick={handleSaveButton} />
        </ContentButtons>
      </ButtonContainer>
    </SearchResultItemContainer>
  );
};

export default SearchResultItem;
