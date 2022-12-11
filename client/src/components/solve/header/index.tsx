import { useEffect } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import selectSolveData from '../../../redux/solve/selector';
import Logo from '../../common/logo';
import { Container, Inner, LogoBox, Title } from './Style';

const Header = () => {
  const { title, minutes, seconds, createdAt, type } = useAppSelector(selectSolveData);

  console.log(minutes, seconds, createdAt);

  // useEffect(() => {
  //   if(type === "")
  // },[type])

  return (
    <Container>
      <Inner>
        <LogoBox>
          <Logo type="small" />
        </LogoBox>
        <Title>{title}</Title>
      </Inner>
    </Container>
  );
};

export default Header;
