import Loading from '../common/Loading';
import Contents from './contents';
import Header from './header';
import Container from './Style';

interface Props {
  isLoading: boolean;
  isError: boolean;
}

const Solve = ({ isLoading, isError }: Props) => {
  if (isLoading) return <Loading />;

  return (
    <Container>
      <Header />
      <Contents />
    </Container>
  );
};

export default Solve;
