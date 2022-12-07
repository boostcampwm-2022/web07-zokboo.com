import axios, { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { getWorkbookById } from '../../api/workbook';
import ButtonComponent from '../../components/common/Button';
import { colors, fonts, media, widths } from '../../styles/theme';
import { SERVER_URL } from '../../utils/constants';
import SampleImage from '../../images/sample-image.jpeg';
import DropDown from '../../components/common/dropdown/Dropdown';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  height: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: center;
  ${media.mobileLength} {
    justify-content: flex-start;
  }

  gap: 8px;

  background-color: ${colors.secondary};
  padding: 20px 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Left = styled.div`
  display: flex;
  ${media.mobileWidth} {
    display: none;
  }
  flex-direction: row;
  align-items: center;

  gap: 4px;
  padding-left: 20px;
`;
const Right = styled.div`
  padding-left: 20px;
  width: 100%;
  max-width: 400px;
`;

const WorkbookIntroduce = styled.div`
  margin-bottom: 150px;
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const WorkbookSaveButton = styled.input`
  padding: 10px 20px;

  border: 1.5px solid ${colors.primary};
  border-radius: 8px;

  :hover {
    opacity: 0.8;
  }

  :active {
    opacity: 0.5;
  }
`;

const Heart = styled.button`
  background: none;
  border: none;
`;

const Title = styled.div`
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.3px;
  line-height: 1.5;
`;
const IsPublic = styled.div`
  display: inline-block;

  background-color: ${colors.primary};
  color: ${colors.white};

  border: none;
  border-radius: 4px;
  font-size: ${fonts.size.xs};
  font-weight: 500;
  padding: 2px 4px;
`;
const Description = styled.div``;

const BodyTitle = styled.div`
  font-weight: ${fonts.weight.bold};
  font-size: ${fonts.size.xl};

  margin-top: 20px;
`;

const ProblemListContainer = styled.div`
  display: flex;
  justify-content: center;
  ${media.mobileWidth} {
    justify-content: flex-start;
  }

  margin: 0 10px;
`;
const ProblemList = styled.div`
  width: 70%;
  ${media.mobileWidth} {
    width: 100%;
  }
`;

const ProblemDropdown = styled.details`
  margin-top: 12px;

  > * {
    padding: 10px 20px;

    border: 1px solid black;
    border-radius: 4px;
  }
`;

const ProblemNumber = styled.summary`
  white-space: nowrap;
  overflow: hidden;

  margin-bottom: 8px;

  ::marker {
    display: none;
    content: '🔽  ';
  }
`;

const Problem = styled.div`
  background-color: white;
`;

const ProblemTitle = styled.div`
  font-weight: 700;
`;
const ProblemDifficulty = styled.div`
  color: ${colors.gray4};
  font-size: ${fonts.size.xs};
`;
const ProblemCommentary = styled.div`
  color: ${colors.gray4};
  font-size: ${fonts.size.xs};
`;
const ProblemHashtags = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 8px;

  font-size: 14px;

  > * {
    font-size: 12px;

    border: none;
    border-radius: 4px;

    margin: 0 4px;
    padding: 2px 4px;

    background-color: ${colors.primary};
    color: ${colors.white};
  }
`;

interface Question {
  questionId: number;
  question: string;
  difficulty: number;
  answer: string;
  commentary: string;
  questionType: string;
  images: string[] | string;
  options: string[] | string;
  hashtags: string[];
}

interface Workbook {
  workbookId: number;
  title: string;
  description: string;
  isPublic: boolean;
  questions: Question[];
}
interface WorkbookResponse {
  msg: string;
  data: Workbook[] | Workbook;
}

const WorkbookDetail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const workbookId = searchParams.get('id');
  const { isLoading, isSuccess, isError, data } = useQuery<Workbook>(['workbook', workbookId], getWorkbookById);
  const [isLike, setIsLike] = useState<boolean>(false);

  const handleLike = useCallback(() => {
    if (isLike) {
      /** 좋아요 취소 api */
    } else {
      /** 좋아요 입력 api */
    }

    setIsLike((prev) => !prev);
  }, []);

  return (
    <PageContainer>
      {isLoading && <div>로딩중</div>}
      {isError && <div>다시 시도해 주세요</div>}
      {isSuccess && (
        <>
          <HeaderContainer>
            <Header>
              <Left>
                <img src={SampleImage} width="400px" alt="" />
              </Left>
              <Right>
                <WorkbookIntroduce>
                  <IsPublic>{data.isPublic ? 'public' : 'private'}</IsPublic>
                  <Title>{`제목 : ${data.title}`}</Title>
                  <Description>{data.description}asdasd123213213</Description>
                </WorkbookIntroduce>
                <ButtonContainer>
                  <WorkbookSaveButton type="button" value="문제집 저장" />
                  <Heart type="button" onClick={handleLike}>
                    {isLike ? <AiFillHeart size={32} /> : <AiOutlineHeart size={32} />}
                  </Heart>
                </ButtonContainer>
              </Right>
            </Header>
          </HeaderContainer>

          <ProblemListContainer>
            <ProblemList>
              <BodyTitle>문제 미리보기</BodyTitle>
              {data.questions.map((x, idx) => {
                return (
                  <ProblemDropdown key={x.questionId}>
                    <ProblemNumber>{idx + 1}번 문제</ProblemNumber>
                    <Problem>
                      <ProblemTitle>문제 : {x.question}</ProblemTitle>
                      <ProblemDifficulty>난이도 : {x.difficulty}</ProblemDifficulty>
                      <ProblemCommentary>메모 : {x.commentary}</ProblemCommentary>
                      <ProblemHashtags>
                        해시태그 :
                        {x.hashtags.map((hashtag, index) => {
                          return <div key={hashtag}>{hashtag}</div>;
                        })}
                      </ProblemHashtags>
                    </Problem>
                  </ProblemDropdown>
                );
              })}
            </ProblemList>
          </ProblemListContainer>
        </>
      )}
    </PageContainer>
  );
};

export default WorkbookDetail;
