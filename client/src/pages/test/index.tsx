import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getTest } from '../../api/test';
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

  // 백엔드에 요청을 하나 줄이는 게 좋을까? 아니면 리렌더링이 발생하지 않는 것이 좋을까?
  // 난 전자같음 => 근데 둘다 가능한 방법은 없을까?
  // const { id, type } = useAppSelector(selectSolveData);

  const { isLoading, isError } = useQuery<GetTestPaperResponse>([KEYS.detail, numberId], getTest, {
    // enabled: numberId !== id || type !== TYPE.test,
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
