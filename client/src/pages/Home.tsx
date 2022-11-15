import styled from 'styled-components';

import { colors, device, fonts } from '../styles/theme';
import reviewNote from '../assets/images/review_note.png';
import paper from '../assets/images/paper.png';
import books from '../assets/images/books.png';
import profile from '../assets/images/profile.png';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 80%;
  margin: 100px auto 0px;

  @media screen and (max-width: ${device.tablet}) {
    width: 100%;
    margin: 50px auto 0px;
  }
`;

const HomeTitle = styled.h1`
  font-size: 28px;

  span {
    color: ${colors.primary};
  }
`;

const HomeDashBoard = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  margin-bottom: 50px;
`;

const HomeDashBoardItem = styled.div`
  display: flex;

  width: 250px;
  height: 120px;

  box-sizing: border-box;
  padding: 15px;

  border-radius: 10px;

  background-color: ${colors.secondary};

  @media screen and (max-width: ${device.tablet}) {
    width: 45%;
  }
`;

const HomeDashBoardItemInfo = styled.div`
  width: 65%;

  h3 {
    margin: 0;
    font-size: ${fonts.size.lg};
  }

  p {
    font-size: ${fonts.size.lg};

    span {
      font-weight: 700;
      font-size: 28px;
    }
  }
`;

const HomeDashBoardItemImageBox = styled.div`
  display: flex;
  align-items: center;

  width: 35%;
  height: 100%;
  img {
    width: 100%;
  }
`;

const HomeChart = styled.div`
  width: 100%;
  height: 400px;

  background-color: ${colors.gray};
`;

const Home = () => {
  return (
    <HomeContainer>
      <HomeTitle>
        <span>회원</span>님의 책장이에요.
      </HomeTitle>

      <HomeDashBoard>
        <HomeDashBoardItem>
          <HomeDashBoardItemInfo>
            <h3>문제집</h3>
            <p>
              <span>10</span>권
            </p>
          </HomeDashBoardItemInfo>
          <HomeDashBoardItemImageBox>
            <img src={books} alt="books" />
          </HomeDashBoardItemImageBox>
        </HomeDashBoardItem>
        <HomeDashBoardItem>
          <HomeDashBoardItemInfo>
            <h3>시험지</h3>
            <p>
              <span>10</span>권
            </p>
          </HomeDashBoardItemInfo>
          <HomeDashBoardItemImageBox>
            <img src={paper} alt="paper" />
          </HomeDashBoardItemImageBox>
        </HomeDashBoardItem>
        <HomeDashBoardItem>
          <HomeDashBoardItemInfo>
            <h3>오답노트</h3>
            <p>
              <span>10</span>권
            </p>
          </HomeDashBoardItemInfo>
          <HomeDashBoardItemImageBox>
            <img src={reviewNote} alt="reviewNote" />
          </HomeDashBoardItemImageBox>
        </HomeDashBoardItem>
        <HomeDashBoardItem>
          <HomeDashBoardItemInfo>
            <h3>내프로필 관리</h3>
            <p>
              <span>10</span>권
            </p>
          </HomeDashBoardItemInfo>
          <HomeDashBoardItemImageBox>
            <img src={profile} alt="profile" />
          </HomeDashBoardItemImageBox>
        </HomeDashBoardItem>
      </HomeDashBoard>

      <HomeChart>차트 같은거 있으면 어떨까?</HomeChart>
    </HomeContainer>
  );
};

export default Home;
