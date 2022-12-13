import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getTestPaper } from '../../api/testpaper';
import Solve from '../../components/solve';
import KEYS from '../../react-query/keys/test';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import selectSolveData from '../../redux/solve/selector';
import { initSolve } from '../../redux/solve/slice';
import { GetTestPaperResponse } from '../../types/test';
import { SOLVE_TYPE } from '../../utils/constants';

const Test = () => {
  const dispatch = useAppDispatch();
  const { testId } = useParams<{ testId: string }>();
  const numberId = testId ? Number(testId) : -1;

  const { id, type } = useAppSelector(selectSolveData);

  const { isLoading, isError } = useQuery<GetTestPaperResponse>([KEYS.detail, numberId], getTestPaper, {
    enabled: numberId !== id || type !== SOLVE_TYPE.test,
    onSuccess: (data: GetTestPaperResponse) => {
      dispatch(
        initSolve({
          id: data.testPaperId,
          questions: data.questions.map((question) => ({
            ...question,
            questionId: question.testPaperQuestionId,
          })),
          title: data.title,
          minutes: data.minutes,
          seconds: data.seconds,
          state: data.state,
          createdAt: data.createdAt,
          type: SOLVE_TYPE.test,
        }),
      );
    },
  });

  return <Solve isLoading={isLoading} isError={isError} />;
};

export default Test;
