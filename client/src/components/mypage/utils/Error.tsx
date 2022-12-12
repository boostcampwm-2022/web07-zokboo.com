import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Error = ({ title }: { title: string }) => {
  return (
    <Container>
      <div>{title}</div>
    </Container>
  );
};

export default Error;
