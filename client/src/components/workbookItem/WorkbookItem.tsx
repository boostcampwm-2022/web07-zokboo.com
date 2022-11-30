import { FiMoreHorizontal } from 'react-icons/fi';
import { AiOutlineHeart, AiFillHeart, AiFillFile, AiOutlineFile } from 'react-icons/ai';
import { useState } from 'react';
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
  Scrap,
  TestButton,
  WorkbookItemContainer,
} from './Style';

interface WorkbookItemProps {
  title: string;
  creatorId: string;
  createAt: string;
  description: string;
}

const WorkbookItem = ({ title, creatorId, createAt, description }: WorkbookItemProps) => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isScrap, setIsScrap] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [scrapCount, setScrapCount] = useState<number>(0);

  return (
    <WorkbookItemContainer>
      <FiMoreHorizontal className="more-button" />
      <ItemTitle>{title}</ItemTitle>
      <ItemExplain>{description}</ItemExplain>
      <ItemCreator>{`생성자 : ${creatorId}`}</ItemCreator>
      <ItemCreateAt>{`생성일 : ${createAt}`}</ItemCreateAt>
      <Buttons>
        <ItemInfo>
          <Heart onClick={() => setIsLike((prev) => !prev)}>
            {isLike ? <AiFillHeart className="fillStyled" /> : <AiOutlineHeart />}
            {likeCount}
          </Heart>
          <Scrap onClick={() => setIsScrap((prev) => !prev)}>
            {isScrap ? <AiFillFile className="fillStyled" /> : <AiOutlineFile />}
            {scrapCount}
          </Scrap>
        </ItemInfo>
        <ContentButtons>
          <TestButton type="button" value="시험 응시하기" />
          <SaveButton type="button" value="저장하기" />
        </ContentButtons>
      </Buttons>
    </WorkbookItemContainer>
  );
};

export default WorkbookItem;
