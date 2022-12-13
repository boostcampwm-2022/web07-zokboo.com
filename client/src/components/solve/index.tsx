import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  useUserData();

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
