import reviewNote from '../../assets/images/review_note.png';
import paper from '../../assets/images/paper.png';
import books from '../../assets/images/books.png';
import profile from '../../assets/images/profile.png';
import { HomeDashBoard, ItemContainer, ItemImageBox, ItemInfo } from './Style';
import { SERVICE_ROUTE } from '../../utils/constants';

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
        link={`/mypage?service=${SERVICE_ROUTE.workbook}`}
        contents={
          <p>
            <span>10</span>권
          </p>
        }
      />
      <DashBoardItem
        title="시험"
        image={profile}
        link={`/mypage?service=${SERVICE_ROUTE.test}`}
        contents={
          <p>
            <span>10</span>개
          </p>
        }
      />
      <DashBoardItem
        title="시험지"
        image={paper}
        link={`/mypage?service=${SERVICE_ROUTE.testpaper}`}
        contents={
          <p>
            <span>10</span>장
          </p>
        }
      />
      <DashBoardItem
        title="오답노트"
        image={reviewNote}
        link={`/mypage?service=${SERVICE_ROUTE.review}`}
        contents={
          <p>
            <span>10</span>권
          </p>
        }
      />
    </HomeDashBoard>
  );
};

export default DashBoard;
