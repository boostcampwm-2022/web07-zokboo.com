import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Error = ({ message }: { message: string }) => {
  return (
    <Container>
      <div>{message}</div>
    </Container>
  );
};

export default Error;
