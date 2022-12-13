import { useCallback, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { AiFillHeart } from '@react-icons/all-files/ai/AiFillHeart';
import { AiOutlineHeart } from '@react-icons/all-files/ai/AiOutlineHeart';
import { toast } from 'react-toastify';
import { getWorkbookById, saveWorkbook } from '../../api/workbook';
import {
  BodyTitle,
  ButtonContainer,
  Description,
  Header,
  HeaderContainer,
  Heart,
  IsPublic,
  PageContainer,
  ProblemList,
  ProblemListContainer,
  Title,
  WorkbookIntroduce,
  WorkbookSaveButton,
} from './Style';
import Loading from '../../components/common/utils/Loading';
import Error from '../../components/common/utils/Error';
import QuestionItem from '../../components/workbookDetail';
import { GetWorkbookListResponse } from '../../types/workbook';

const WorkbookDetail = () => {
  const [searchParams] = useSearchParams();
  const workbookId = searchParams.get('id');
  const [workbook, setWorkbook] = useState<GetWorkbookListResponse>({
    workbookId: 0,
    title: '',
    description: '',
    isPublic: false,
    questions: [],
  });
  const { isLoading, isSuccess, isError } = useQuery(['workbook', workbookId], getWorkbookById, {
    onSuccess: (d) => {
      setWorkbook(d.data);
    },
  });

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
      {isLoading && <Loading />}
      {isSuccess && (
        <>
          <HeaderContainer>
            <Header>
              <WorkbookIntroduce>
                <IsPublic>{workbook.isPublic ? 'public' : 'private'}</IsPublic>
                <Title>{`제목 : ${workbook.title}`}</Title>
                <Description>{workbook.description}</Description>
              </WorkbookIntroduce>
              <ButtonContainer>
                <Heart type="button" onClick={handleLike}>
                  {isLike ? <AiFillHeart size={32} /> : <AiOutlineHeart size={32} />}
                </Heart>
                <WorkbookSaveButton type="button" value="문제집 저장" onClick={handleWorkbookSave} />
              </ButtonContainer>
            </Header>
          </HeaderContainer>

          <ProblemListContainer>
            <ProblemList>
              <BodyTitle>문제 미리보기</BodyTitle>
              {workbook.questions.length !== 0
                ? workbook.questions.map((question, idx) => (
                    <QuestionItem key={question.questionId} {...question} index={idx} />
                  ))
                : null}
            </ProblemList>
          </ProblemListContainer>
        </>
      )}
      {isError && <Error message="문제집 정보를 불러올 수 없습니다. 다시 시도해주세요." />}
    </PageContainer>
  );
};

export default WorkbookDetail;
