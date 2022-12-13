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
        image="https://kr.object.ncloudstorage.com/asset.image/books.svg"
        link={`/mypage?service=${SERVICE_ROUTE.workbook}`}
        contents={
          <p>
            <span>10</span>권
          </p>
        }
      />
      <DashBoardItem
        title="시험"
        image="https://kr.object.ncloudstorage.com/asset.image/profile.svg"
        link={`/mypage?service=${SERVICE_ROUTE.test}`}
        contents={
          <p>
            <span>10</span>개
          </p>
        }
      />
      <DashBoardItem
        title="시험지"
        image="https://kr.object.ncloudstorage.com/asset.image/paper.svg"
        link={`/mypage?service=${SERVICE_ROUTE.testpaper}`}
        contents={
          <p>
            <span>10</span>장
          </p>
        }
      />
      <DashBoardItem
        title="오답노트"
        image="https://kr.object.ncloudstorage.com/asset.image/review-note.svg"
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
