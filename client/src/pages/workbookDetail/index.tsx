import { useCallback, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { getWorkbookById, saveWorkbook } from '../../api/workbook';
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
  const [isLike, setIsLike] = useState<boolean>(false);

  const saveWorkbookMutation = useMutation(saveWorkbook);

  const handleWorkbookSave = () => {
    const numberId = Number(workbookId);

    saveWorkbookMutation.mutate(
      {
        workbookId: numberId,
      },
      {
        onSuccess: () => {
          toast.success('문제집을 저장했습니다.');
        },
      },
    );
  };

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
              <Right>
                <WorkbookIntroduce>
                  <IsPublic>{data.isPublic ? 'public' : 'private'}</IsPublic>
                  <Title>{`제목 : ${data.title}`}</Title>
                  <Description>{data.description}asdasd123213213</Description>
                </WorkbookIntroduce>
                <ButtonContainer>
                  <WorkbookSaveButton type="button" value="문제집 저장" onClick={handleWorkbookSave} />
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
