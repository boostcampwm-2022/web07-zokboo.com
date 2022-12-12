import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { getWorkbookById } from '../../api/workbook';
import SampleImage from '../../images/sample-image.jpeg';
import SampleQuestionImage from '../../images/sample-question-image.png';

import {
  BodyTitle,
  ButtonContainer,
  Description,
  Header,
  HeaderContainer,
  Heart,
  IsPublic,
  Left,
  PageContainer,
  Problem,
  ProblemCommentary,
  ProblemDifficulty,
  ProblemDropdown,
  ProblemHashtags,
  ProblemImg,
  ProblemList,
  ProblemListContainer,
  ProblemNumber,
  ProblemTitle,
  Right,
  Title,
  WorkbookIntroduce,
  WorkbookSaveButton,
} from './Style';

interface Question {
  questionId: number;
  question: string;
  difficulty: number;
  answer: string;
  commentary: string;
  questionType: string;
  images: string[];
  options: string[];
  hashtags: string[];
}

interface Workbook {
  workbookId: number;
  title: string;
  description: string;
  isPublic: boolean;
  questions: Question[];
}

const WorkbookDetail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const workbookId = searchParams.get('id');
  const { isLoading, isSuccess, isError, data } = useQuery<Workbook>(['workbook', workbookId], getWorkbookById);
  const [isHeart, setIsHeart] = useState<boolean>(false);

  const handleHeart = useCallback(() => {
    if (isHeart) {
      /** 좋아요 취소 api */
      alert('좋아요가 취소되었습니다.');
    } else {
      /** 좋아요 입력 api */
      alert('좋아요를 눌렀습니다.');
    }

    setIsHeart((prev) => !prev);
  }, []);

  return (
    <PageContainer>
      {isLoading && <div>로딩중</div>}
      {isError && <div>다시 시도해 주세요</div>}
      {isSuccess && (
        <>
          <HeaderContainer>
            <Header>
              <Right>
                <WorkbookIntroduce>
                  <IsPublic>{data.isPublic ? 'public' : 'private'}</IsPublic>
                  <Title>{`제목 : ${data.title}`}</Title>
                  <Description>{data.description}asdasd123213213</Description>
                </WorkbookIntroduce>
                <ButtonContainer>
                  <WorkbookSaveButton type="button" value="문제집 저장" />
                  <Heart type="button" onClick={handleHeart}>
                    {isHeart ? <AiFillHeart size={32} /> : <AiOutlineHeart size={32} />}
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
                      <ProblemImg src={SampleQuestionImage} alt="" />

                      <ProblemHashtags>
                        해시태그 :
                        {x.hashtags.map((hashtag, index) => {
                          return <div key={hashtag}>{hashtag}</div>;
                        })}
                      </ProblemHashtags>
                      <ProblemDifficulty>난이도 : {x.difficulty}</ProblemDifficulty>
                      <ProblemCommentary>메모 : {x.commentary}</ProblemCommentary>
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
