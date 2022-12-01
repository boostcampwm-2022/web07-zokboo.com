import { FiMoreHorizontal } from 'react-icons/fi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Buttons,
  ContentButtons,
  Heart,
  ItemCreateAt,
  ItemCreator,
  ItemExplain,
  ItemInfo,
  ItemTitle,
  SaveButton,
  SearchResultItemContainer,
  TestButton,
} from './Style';

interface SearchResultItemProps {
  id: number;
  title: string;
  creatorId: string;
  createAt: string;
  description: string;
}

const SearchResultItem = ({ id, title, creatorId, createAt, description }: SearchResultItemProps) => {
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
    navigate(`./view?id=${id}`);
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
      <ItemCreator>{`생성자 : ${creatorId}`}</ItemCreator>
      <ItemCreateAt>{`생성일 : ${createAt}`}</ItemCreateAt>
      <Buttons>
        <ItemInfo>
          <Heart type="button" onClick={handleLike}>
            {isLike ? <AiFillHeart className="fillStyled" /> : <AiOutlineHeart />}
          </Heart>
        </ItemInfo>
        <ContentButtons>
          <TestButton type="button" value="시험 응시하기" onClick={handleTestButton} />
          <SaveButton type="button" value="저장하기" onClick={handleSaveButton} />
        </ContentButtons>
      </Buttons>
    </SearchResultItemContainer>
  );
};

export default SearchResultItem;
