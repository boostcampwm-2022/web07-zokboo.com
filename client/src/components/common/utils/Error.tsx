import styled from 'styled-components';

const Emoji = styled.div`
  font-size: 60px;
  margin-bottom: 10px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Error = ({ emoji, message }: { emoji?: string; message: string }) => {
  return (
    <Container>
      <Emoji>{emoji}</Emoji>
      <div>{message}</div>
    </Container>
  );
};

export default Error;
