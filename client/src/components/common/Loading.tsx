import { useState, useEffect } from 'react';
import { VscCircleOutline } from '@react-icons/all-files/vsc/VscCircleOutline';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const LoadingIcon = styled.div<{ isActive: boolean }>`
  opacity: ${(props) => (props.isActive ? `1` : `0`)};

  transition: all 1s;
`;

const Loading = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev + 1) % 4);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Container>
      <LoadingIcon isActive={count > 0}>
        <VscCircleOutline />
      </LoadingIcon>
      <LoadingIcon isActive={count > 1}>
        <VscCircleOutline />
      </LoadingIcon>
      <LoadingIcon isActive={count > 2}>
        <VscCircleOutline />
      </LoadingIcon>
    </Container>
  );
};

export default Loading;
