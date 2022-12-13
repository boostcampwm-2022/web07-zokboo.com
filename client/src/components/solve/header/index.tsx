import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import selectSolveData from '../../../redux/solve/selector';
import { SOLVE_TYPE, TEST_TYPE } from '../../../utils/constants';
import Logo from '../../common/logo';
import { Container, Inner, LogoBox, Title } from './Style';

const changeTime = (timer: number) => {
  const minute = Math.floor(timer / 60).toString();
  const second = (timer % 60).toString();

  return `${minute.padStart(2, '0')} : ${second.padStart(2, '0')}`;
};

interface Props {
  handleTestGrade: () => void;
}

const Header = ({ handleTestGrade }: Props) => {
  const { title, minutes, seconds, createdAt, type, state } = useAppSelector(selectSolveData);
  const intervalRef = useRef<NodeJS.Timer>();
  const [timer, setTimer] = useState(-1);

  useEffect(() => {
    if (type === SOLVE_TYPE.test) {
      const start = new Date(createdAt).getTime();

      const curr = new Date().getTime();

      const end = start + minutes * 60 * 1000 + seconds * 1000;

      const remain = Math.floor((end - curr) / 1000);
      setTimer(remain);
    }
  }, [type]);

  useEffect(() => {
    if (state === TEST_TYPE.solve)
      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (timer < 0 && state === TEST_TYPE.solve) {
      handleTestGrade();
    }
  }, [timer, state]);

  return (
    <Container>
      <Inner isShow>
        <LogoBox>
          <Logo type="small" />
        </LogoBox>
        <Title>{title}</Title>
      </Inner>

      <Inner isShow={state === TEST_TYPE.solve}>{changeTime(timer)}</Inner>
    </Container>
  );
};

export default Header;
