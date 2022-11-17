import { MainTitleContainer, MainTitleHeader } from './Style';

interface Props {
  title: string;
}

const MainTitle = ({ title }: Props) => {
  return (
    <MainTitleContainer>
      <MainTitleHeader>{title}</MainTitleHeader>
    </MainTitleContainer>
  );
};

export default MainTitle;
