import { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { gradeTestPaper } from '../../api/testpaper';
import { solveWorkbookQuestion } from '../../api/workbook';
import useUserData from '../../hooks/useUserData';
import KEYS from '../../react-query/keys/test';
import { useAppSelector } from '../../redux/hooks';
import selectSolveData from '../../redux/solve/selector';
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
  const userData = useUserData();
  const queryClient = useQueryClient();
  const { id, answerList } = useAppSelector(selectSolveData);
  const gradeTestMutation = useMutation(gradeTestPaper);

  const handleTestGrade = () => {
    gradeTestMutation.mutate(
      {
        testPaperId: id,
        body: answerList,
      },
      {
        onSuccess: () => {
          toast.success('시험이 종료되었습니다.');
          queryClient.invalidateQueries([KEYS.detail, id]);
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
