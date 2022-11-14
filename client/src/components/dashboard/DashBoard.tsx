import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, device, fonts } from '../../styles/theme';
import DashBoardItem from './DashBoardItem';
import addIcon from '../../assets/images/add.svg';

const DashBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  width: 45%;
  height: 250px;

  padding: 10px;
  margin-top: 50px;

  border-radius: 5px;

  background-color: ${colors.offWhite};
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: ${device.tablet}) {
    width: 100%;
  }

  @media screen and (max-width: ${device.mobileWidth}) {
    width: ${device.mobileWidth};
  }
`;

const DashBoardList = styled.div`
  display: flex;
  justify-content: space-around;
`;

const DashBoardWrapper = styled.div<{ justifyContent: string }>`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  align-items: center;
`;

const DashBoardTitle = styled.h2`
  font-size: ${fonts.size.lg};

  margin: 0;
`;

const DashBoardMoreLink = styled(Link)`
  color: ${colors.gray};
  text-decoration-line: none;
`;

const DashBoardCreateLink = styled(Link)`
  color: ${colors.text};
  text-decoration-line: none;

  img {
    width: 15px;
    height: 15px;
  }
`;

interface Props {
  title: string;
  moreLink: string;
  createLink: string;
}

const DashBoard = ({ title, moreLink, createLink }: Props) => {
  return (
    <DashBoardContainer>
      <DashBoardWrapper justifyContent="space-between">
        <DashBoardTitle>{title}</DashBoardTitle>
        <DashBoardMoreLink to={moreLink}>더보기</DashBoardMoreLink>
      </DashBoardWrapper>
      <DashBoardList>
        <DashBoardItem />
        <DashBoardItem />
        <DashBoardItem />
      </DashBoardList>
      <DashBoardWrapper justifyContent="flex-end">
        <DashBoardCreateLink to={createLink}>
          <img src={addIcon} alt="addIcon" />
        </DashBoardCreateLink>
      </DashBoardWrapper>
    </DashBoardContainer>
  );
};

export default DashBoard;
