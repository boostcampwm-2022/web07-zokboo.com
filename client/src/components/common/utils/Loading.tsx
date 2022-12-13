import styled from 'styled-components';
import loadingImg from '../../../images/loading.gif';

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = () => {
  return (
    <Container>
      <img src={loadingImg} alt="로딩중" style={{ width: '52px' }} />
    </Container>
  );
};

export default Loading;
