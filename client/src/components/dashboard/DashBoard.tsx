import reviewNote from '../../assets/images/review_note.png';
import paper from '../../assets/images/paper.png';
import books from '../../assets/images/books.png';
import profile from '../../assets/images/profile.png';
import { HomeDashBoard, ItemContainer, ItemImageBox, ItemInfo } from './Style';

interface ItemProps {
  title: string;
  image: string;
  link: string;
  contents: JSX.Element | null;
}

const DashBoardItem = ({ title, image, link, contents }: ItemProps) => {
  return (
    <ItemContainer to={link}>
      <ItemInfo>
        <h3>{title}</h3>
        {contents}
      </ItemInfo>
      <ItemImageBox>
        <img src={image} alt="books" />
      </ItemImageBox>
    </ItemContainer>
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
    </HomeDashBoard>
  );
};

export default DashBoard;
