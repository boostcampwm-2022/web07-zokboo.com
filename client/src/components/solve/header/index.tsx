import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import selectSolveData from '../../../redux/solve/selector';
import TYPE from '../../../types/solve';
import Logo from '../../common/logo';
import { Container, Inner, LogoBox, Title } from './Style';

const changeTime = (timer: number) => {
  const minute = Math.floor(timer / 60).toString();
  const second = (timer % 60).toString();

  return `${minute.padStart(2, '0')} : ${second.padStart(2, '0')}`;
};

const Header = () => {
  const { title, minutes, seconds, createdAt, type } = useAppSelector(selectSolveData);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (type === TYPE.test) {
      const start = new Date(createdAt).getTime();

      const curr = new Date().getTime();

      const end = start + minutes * 60 * 1000 + seconds * 1000;

      const remain = Math.floor((end - curr) / 1000);
      setTimer(remain);
    }
  }, [type]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  return (
    <Container>
      <Inner>
        <LogoBox>
          <Logo type="small" />
        </LogoBox>
        <Title>{title}</Title>
      </Inner>

      <Inner>{changeTime(timer)}</Inner>
    </Container>
  );
};

export default Header;
