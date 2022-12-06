import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getWorkbookList } from '../../api/workbook';
import Loading from '../../components/common/Loading';
import Solve from '../../components/solve';
import KEYS from '../../react-query/keys/workbook';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import selectSolveData from '../../redux/solve/selector';
import { initSolve } from '../../redux/solve/slice';
import { GetWorkbookListResponse } from '../../types/workbook';

const Workbook = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const numberId = id ? Number(id) : -1;

  // const { id, type } = useAppSelector(selectSolveData);

  const { isLoading, isError } = useQuery<GetWorkbookListResponse>(
    KEYS.detail,
    () => {
      return getWorkbookList(numberId);
    },
    {
      onSuccess: (data: GetWorkbookListResponse) => {
        dispatch(
          initSolve({
            id: data.workbookId,
            questions: data.questions,
            title: data.title,
            type: 'workbooks',
          }),
        );
      },
    },
  );

  return <Solve isLoading={isLoading} isError={isError} />;
};

export default Workbook;
