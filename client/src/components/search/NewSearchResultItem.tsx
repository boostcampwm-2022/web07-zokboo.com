import styled from 'styled-components';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, fonts } from '../../styles/theme';
import SampleImage from '../../images/sample-image.jpeg';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  background-color: #fff;

  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  width: 300px;
  height: 370px;

  cursor: pointer;
`;
const WorkbookImage = styled.img`
  border: 1px solid black;
  border-radius: 6px 6px 0 0;
  width: 100%;
  height: 170px;

  object-fit: cover;
  object-position: center;
`;
const WorkbookContent = styled.div`
  display: flex;
  flex-direction: column;

  margin: 12px;
`;
const Title = styled.div`
  font-size: ${fonts.size.lg};
  font-weight: ${fonts.weight.bold};
  margin-bottom: 8px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DescriptionContainer = styled.div`
  color: ${colors.gray3};
  font-size: ${fonts.size.xs};

  height: 110px;
`;

const Description = styled.div`
  height: 80%;
  overflow: hidden;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-top: 1px solid ${colors.gray2};

  color: ${colors.gray4};
  font-size: ${fonts.size.xs};

  padding-top: 12px;
`;

const CreatorContainer = styled.div`
  display: flex;
`;

const Creator = styled.div`
  padding-right: 8px;
`;
const CreateAt = styled.div``;
const Heart = styled.div`
  .fillStyled {
    color: ${colors.primary};
  }
`;

interface SearchResultItemProps {
  id: number;
  title: string;
  creatorId: string;
  createAt: string;
  description: string;
  like: boolean;
}

const NewSearchResultItem = ({ id, title, creatorId, createAt, description, like }: SearchResultItemProps) => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleMoveWorkbookView = () => {
    navigate(`./view?id=${id}`);
  };

  return (
    <Container onClick={handleMoveWorkbookView}>
      <WorkbookImage src={SampleImage} alt="" />
      <WorkbookContent>
        <Title>제목제목제목제목제목제목제목제목제목제목제목</Title>
        <DescriptionContainer>
          <Description>
            내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라내용블라블라
          </Description>
        </DescriptionContainer>
        <Info>
          <CreatorContainer>
            <Creator>글쓴이</Creator>
            <CreateAt>생성일</CreateAt>
          </CreatorContainer>
          <Heart onClick={() => setIsLike((prev) => !prev)}>
            {isLike ? <AiFillHeart className="fillStyled" size={20} /> : <AiOutlineHeart size={20} />}
          </Heart>
        </Info>
      </WorkbookContent>
    </Container>
  );
};

export default NewSearchResultItem;
