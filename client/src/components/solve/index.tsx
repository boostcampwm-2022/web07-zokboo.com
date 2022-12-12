import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { gradeTestPaper } from '../../api/testpaper';
import { solveWorkbookQuestion } from '../../api/workbook';
import useUserData from '../../hooks/useUserData';
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
  // const userData = useUserData();
  const gradeTestMutation = useMutation(gradeTestPaper);

  const handleTestGrade = () => {
    gradeTestMutation.mutate({
      testPaperQuestionId: 0,
      questionId: 1,
      QuestionType: 'string',
      writtenAnswer: 'string',
    });
  };

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError]);

  if (isLoading) return <Loading />;

  return (
    <Container>
      <Header />
      <Contents />
    </Container>
  );
};

export default Solve;
