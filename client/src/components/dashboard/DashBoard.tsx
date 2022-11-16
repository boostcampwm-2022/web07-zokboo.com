import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, device, fonts } from '../../styles/theme';
import reviewNote from '../../assets/images/review_note.png';
import paper from '../../assets/images/paper.png';
import books from '../../assets/images/books.png';
import profile from '../../assets/images/profile.png';

const HomeDashBoard = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  margin-bottom: 50px;
`;

const DashBoardItemContainer = styled(Link)`
  display: flex;

  width: 22%;
  height: 120px;

  box-sizing: border-box;
  padding: 15px;

  border-radius: 10px;
  background-color: ${colors.secondary};

  color: ${colors.text};

  cursor: pointer;
  text-decoration-line: none;

  @media screen and (max-width: ${device.tablet}) {
    width: 45%;
    margin-top: 10px;
  }
`;

const DashBoardItemInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  width: 65%;

  h3 {
    margin: 0;
    font-size: ${fonts.size.lg};
  }

  p {
    font-size: ${fonts.size.lg};
    margin: 8px 0;

    span {
      font-weight: ${fonts.weight.bold};
      font-size: ${fonts.size.xxl};
    }
  }
`;

const DashBoardItemImageBox = styled.div`
  display: flex;
  align-items: center;

  width: 35%;
  height: 100%;
  img {
    width: 100%;
    max-width: 100px;
  }
`;

interface ItemProps {
  title: string;
  image: string;
  link: string;
  contents: JSX.Element | null;
}

const DashBoardItem = ({ title, image, link, contents }: ItemProps) => {
  return (
    <DashBoardItemContainer to={link}>
      <DashBoardItemInfo>
        <h3>{title}</h3>
        {contents}
      </DashBoardItemInfo>
      <DashBoardItemImageBox>
        <img src={image} alt="books" />
      </DashBoardItemImageBox>
    </DashBoardItemContainer>
  );
};

const DashBoard = () => {
  return (
    <HomeDashBoard>
      <DashBoardItem
        title="문제집"
        image={books}
        link="/mypage"
        contents={
          <p>
            <span>10</span>권
          </p>
        }
      />
      <DashBoardItem
        title="시험지"
        image={paper}
        link="/mypage"
        contents={
          <p>
            <span>10</span>장
          </p>
        }
      />
      <DashBoardItem
        title="오답노트"
        image={reviewNote}
        link="/mypage"
        contents={
          <p>
            <span>10</span>권
          </p>
        }
      />
      <DashBoardItem title="내 프로필" image={profile} link="/mypage" contents={null} />
      {/* <DashBoardItemContainer>
        <DashBoardItemInfoContainer>
          <h3>시험지</h3>
          <p>
            <span>10</span>권
          </p>
        </DashBoardItemInfoContainer>
        <DashBoardItemImageBoxContainer>
          <img src={paper} alt="paper" />
        </DashBoardItemImageBoxContainer>
      </DashBoardItemContainer>
      <DashBoardItemContainer>
        <DashBoardItemInfoContainer>
          <h3>오답노트</h3>
          <p>
            <span>10</span>권
          </p>
        </DashBoardItemInfoContainer>
        <DashBoardItemImageBoxContainer>
          <img src={reviewNote} alt="reviewNote" />
        </DashBoardItemImageBoxContainer>
      </DashBoardItemContainer>
      <DashBoardItemContainer>
        <DashBoardItemInfoContainer>
          <h3>내프로필 관리</h3>
          <p>
            <span>10</span>권
          </p>
        </DashBoardItemInfoContainer>
        <DashBoardItemImageBoxContainer>
          <img src={profile} alt="profile" />
        </DashBoardItemImageBoxContainer>
      </DashBoardItemContainer> */}
    </HomeDashBoard>
  );
};

export default DashBoard;
