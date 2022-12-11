import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getTest } from '../../api/test';
import Solve from '../../components/solve';
import KEYS from '../../react-query/keys/test';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import selectSolveData from '../../redux/solve/selector';
import { initSolve } from '../../redux/solve/slice';
import TYPE from '../../types/solve';
import { GetTestPaperResponse } from '../../types/test';

const Test = () => {
  const dispatch = useAppDispatch();
  const { testId } = useParams<{ testId: string }>();
  const numberId = testId ? Number(testId) : -1;

  const { id, type } = useAppSelector(selectSolveData);

  const { isLoading, isError } = useQuery<GetTestPaperResponse>(
    KEYS.detail,
    () => {
      return getTest(numberId);
    },
    {
      enabled: numberId !== id || type !== TYPE.test,
      onSuccess: (data: GetTestPaperResponse) => {
        dispatch(
          initSolve({
            id: data.testPaperId,
            questions: data.questions,
            title: data.title,
            minutes: data.minutes,
            seconds: data.seconds,
            createdAt: data.createdAt,
            type: TYPE.test,
          }),
        );
      },
    },
  );

  return <Solve isLoading={isLoading} isError={isError} />;
};

export default Test;
