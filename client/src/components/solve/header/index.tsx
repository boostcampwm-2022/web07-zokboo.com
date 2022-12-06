import Logo from '../../common/logo';
import { Container, Inner, LogoBox, Title } from './Style';

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
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
