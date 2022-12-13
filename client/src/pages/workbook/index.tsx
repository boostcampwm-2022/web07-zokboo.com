import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getWorkbook } from '../../api/workbook';
import Solve from '../../components/solve';
import KEYS from '../../react-query/keys/workbook';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import selectSolveData from '../../redux/solve/selector';
import { initSolve } from '../../redux/solve/slice';
import { GetWorkbookListResponse } from '../../types/workbook';
import { SOLVE_TYPE } from '../../utils/constants';

const Workbook = () => {
  const dispatch = useAppDispatch();
  const { workbookId } = useParams<{ workbookId: string }>();
  const numberId = workbookId ? Number(workbookId) : -1;

  const { id, type } = useAppSelector(selectSolveData);

  const { isLoading, isError } = useQuery<GetWorkbookListResponse>(
    KEYS.detail,
    () => {
      return getWorkbook(numberId);
    },
    {
      enabled: numberId !== id || type !== SOLVE_TYPE.workbook,
      onSuccess: ({ data }: GetWorkbookListResponse) => {
        dispatch(
          initSolve({
            id: data.workbookId,
            questions: data.questions.map((question) => {
              return { ...question, questionId: question.workbookQuestionId };
            }),
            title: data.title,
            type: SOLVE_TYPE.workbook,
            state: 'WORKBOOK',
          }),
        );
      },
    },
  );

  return <Solve isLoading={isLoading} isError={isError} />;
};

export default Workbook;
