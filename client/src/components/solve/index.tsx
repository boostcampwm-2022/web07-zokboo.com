import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { gradeTestPaper } from '../../api/testpaper';
import useUserData from '../../hooks/useUserData';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import selectSolveData from '../../redux/solve/selector';
import { updateGradeQuestion } from '../../redux/solve/slice';
import { GetGradeTestPaperResponse } from '../../types/test';
import Loading from '../common/Loading';
import Contents from './contents';
import Header from './header';
import Container from './Style';

interface Props {
  isLoading: boolean;
  isError: boolean;
}

const Solve = ({ isLoading, isError }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useUserData();
  const { id, answerList } = useAppSelector(selectSolveData);
  const gradeTestMutation = useMutation(gradeTestPaper);

  const handleTestGrade = () => {
    gradeTestMutation.mutate(
      {
        testPaperId: id,
        body: { questions: answerList },
      },
      {
        onSuccess: ({ data }: GetGradeTestPaperResponse) => {
          toast.success('시험이 종료되었습니다.');
          dispatch(
            updateGradeQuestion({
              questions: data.questions.map((question) => ({
                ...question,
                questionId: question.testPaperQuestionId,
              })),
              state: data.state,
            }),
          );
        },
      },
    );
  };

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError]);

  if (isLoading) return <Loading />;

  return (
    <Container>
      <Header handleTestGrade={handleTestGrade} />
      <Contents handleTestGrade={handleTestGrade} />
    </Container>
  );
};

export default Solve;
