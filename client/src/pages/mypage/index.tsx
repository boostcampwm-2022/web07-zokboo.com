import { BsCheckLg } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import {
  CategoryItem,
  CategoryLink,
  CategoryList,
  CategoryTitle,
  Container,
  ContentsContainer,
  LinkList,
  MobileContainer,
  MyPageLink,
  SideContainer,
  UserContainer,
  UserImageBox,
  UserInfoBox,
} from './Style';
import SERVICE_ROUTE from './constants';
import MypageWorkbook from '../../components/mypage/Workbook';
import { MYPAGE_TYPE } from '../../utils/constants';

const MyPage = () => {
  const location = useLocation();
  const query = queryString.parse(location.search);

  const checkActiveService = (service: string) => {
    if (query.service === service) return true;

    return false;
  };

  return (
    <Container>
      <SideContainer>
        <MobileContainer>
          <UserContainer>
            <UserImageBox>
              <img src="#" alt="profile" />
            </UserImageBox>
            <UserInfoBox>
              <span>회원님</span> 반갑습니다.
            </UserInfoBox>
          </UserContainer>

          <LinkList>
            <MyPageLink to="/workbook/new">문제집 만들기</MyPageLink>
            <MyPageLink to="/workbook/new">시험지 만들기</MyPageLink>
          </LinkList>
        </MobileContainer>

        <MobileContainer>
          <CategoryTitle>나의 서비스</CategoryTitle>
          <CategoryList>
            <CategoryItem isActive={checkActiveService(SERVICE_ROUTE.test)}>
              <CategoryLink to={`/mypage?service=${SERVICE_ROUTE.test}`}>
                <span>나의 시험지</span>
                {checkActiveService(SERVICE_ROUTE.test) && (
                  <span>
                    <BsCheckLg />
                  </span>
                )}
              </CategoryLink>
            </CategoryItem>
            <CategoryItem isActive={checkActiveService(SERVICE_ROUTE.workbook)}>
              <CategoryLink to={`/mypage?service=${SERVICE_ROUTE.workbook}`}>
                <span>나의 문제집</span>
                {checkActiveService(SERVICE_ROUTE.workbook) && (
                  <span>
                    <BsCheckLg />
                  </span>
                )}
              </CategoryLink>
            </CategoryItem>
            <CategoryItem isActive={checkActiveService(SERVICE_ROUTE.share)}>
              <CategoryLink to={`/mypage?service=${SERVICE_ROUTE.share}`}>
                <span>공유 받은 문제집</span>
                {checkActiveService(SERVICE_ROUTE.share) && (
                  <span>
                    <BsCheckLg />
                  </span>
                )}
              </CategoryLink>
            </CategoryItem>
          </CategoryList>
        </MobileContainer>
      </SideContainer>
      <ContentsContainer>
        {query.service === SERVICE_ROUTE.test && <div>나의 시험지{/** 아직 컴포넌트 미제작 */}</div>}
        {query.service === SERVICE_ROUTE.workbook && <MypageWorkbook type={MYPAGE_TYPE.나의문제집} />}
        {query.service === SERVICE_ROUTE.share && <MypageWorkbook type={MYPAGE_TYPE.공유받은문제집} />}
      </ContentsContainer>
    </Container>
  );
};

export default MyPage;
