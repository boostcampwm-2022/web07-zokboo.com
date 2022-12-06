import { useAppSelector } from '../../../redux/hooks';
import selectSolveData from '../../../redux/solve/selector';
import Logo from '../../common/logo';
import { Container, Inner, LogoBox, Title } from './Style';

const Header = () => {
  const { title } = useAppSelector(selectSolveData);

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
