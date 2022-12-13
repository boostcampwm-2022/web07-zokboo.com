import { AiFillHeart } from '@react-icons/all-files/ai/AiFillHeart';
import { AiOutlineHeart } from '@react-icons/all-files/ai/AiOutlineHeart';
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
        <Title>{title}</Title>
        <DescriptionContainer>
          <Description>{description}</Description>
        </DescriptionContainer>
        <Info>
          <CreatorContainer>
            <Creator>글쓴이 : </Creator>
            <CreateAt>문제개수 : {questionCount}</CreateAt>
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
