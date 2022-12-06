import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getWorkbookList } from '../../api/workbook';
import KEYS from '../../react-query/keys/workbook';
import { GetWorkbookListResponse } from '../../types/workbook';
import Loading from '../common/Loading';
import Contents from './contents';
import Header from './header';
import Container from './Style';

const Solve = () => {
  const { id } = useParams<{ id: string }>();
  const workbookId = id ? Number(id) : -1;

  const { data } = useQuery<GetWorkbookListResponse>(KEYS.detail, () => {
    return getWorkbookList(workbookId);
  });

  if (!data) return <Loading />;

  return (
    <Container>
      <Header title={data.title} />
      <Contents questions={data.questions} id={workbookId} />
    </Container>
  );
};

export default Solve;
