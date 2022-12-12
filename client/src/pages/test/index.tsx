import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getTest } from '../../api/test';
import Solve from '../../components/solve';
import KEYS from '../../react-query/keys/test';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import selectSolveData from '../../redux/solve/selector';
import { initSolve } from '../../redux/solve/slice';
import { GetTestListResponse } from '../../types/test';

const Test = () => {
  const dispatch = useAppDispatch();
  const { testId } = useParams<{ testId: string }>();
  const numberId = testId ? Number(testId) : -1;

  const { id, type } = useAppSelector(selectSolveData);

  const { isLoading, isError } = useQuery<GetTestListResponse>(
    KEYS.detail,
    () => {
      return getTest(numberId);
    },
    {
      enabled: numberId !== id || type !== 'test',
      onSuccess: (data: GetTestListResponse) => {
        dispatch(
          initSolve({
            id: data.testId,
            questions: data.questions,
            title: data.title,
            minute: data.minute,
            second: data.second,
            type: 'test',
          }),
        );
      },
    },
  );

  return <Solve isLoading={isLoading} isError={isError} />;
};

export default Test;
