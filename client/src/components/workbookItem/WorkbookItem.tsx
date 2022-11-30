import styled from 'styled-components';
import { FiMoreHorizontal } from 'react-icons/fi';
import { AiOutlineHeart, AiFillHeart, AiFillFile, AiOutlineFile } from 'react-icons/ai';
import { useState } from 'react';
import { colors, device } from '../../styles/theme';

const WorkbookItemContainer = styled.div`
  border: 1px solid ${colors.gray3};
  border-radius: 4px;
  box-shadow: 2px 2px ${colors.gray1};
  padding: 16px 12px;
  margin: 20px 0px;
  .more-button {
    float: right;
  }
  @media screen and (max-width: ${device.mobileWidth}) {
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid ${colors.gray3};
    box-shadow: none;
  }
`;

const ItemTitle = styled.div``;
const ItemExplain = styled.div`
  font-size: 12px;
  color: ${colors.gray4};
  padding: 8px 0px;
`;
const ItemCreator = styled.div`
  font-size: 8px;
  color: ${colors.gray3};
`;

const ItemCreateAt = styled.div`
  font-size: 8px;
  color: ${colors.gray3};
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 16px;
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 14px;
  color: ${colors.gray4};
  > * {
    padding: 4px;
  }
  .fillStyled {
    color: ${colors.primary};
  }
`;

const Heart = styled.div``;
const Scrap = styled.div``;

const ContentButtons = styled.div`
  float: right;
  > * {
    margin: 0px 0px 0px 24px;
    padding: 4px;
    background: none;
    border: 1px solid ${colors.primary};
    border-radius: 4px;
    color: ${colors.primary};
    :hover {
      opacity: 0.7;
    }
  }
`;
const TestButton = styled.input``;
const SaveButton = styled.input``;

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
