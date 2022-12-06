import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SampleImage from '../../../images/sample-image.jpeg';
import {
  Container,
  CreateAt,
  Creator,
  CreatorContainer,
  Description,
  DescriptionContainer,
  Heart,
  Info,
  Title,
  WorkbookContent,
  WorkbookImage,
} from './Style';
import SearchWorkbookType from '../../../types/search';

const NewSearchResultItem = ({ workbookId, title, description, questionCount }: SearchWorkbookType) => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleMoveWorkbookView = () => {
    navigate(`./view?id=${workbookId}`);
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
          <Heart type="button" onClick={() => setIsLike((prev) => !prev)}>
            {isLike ? <AiFillHeart className="fillStyled" size={20} /> : <AiOutlineHeart size={20} />}
          </Heart>
        </Info>
      </WorkbookContent>
    </Container>
  );
};

export default NewSearchResultItem;
