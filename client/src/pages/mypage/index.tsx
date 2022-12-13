import { BsCheckLg } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';
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
import { MYPAGE_TYPE, SERVICE_ROUTE } from '../../utils/constants';
import TestPaper from '../../components/mypage/testPaper';
import Test from '../../components/mypage/test';
import MypageWorkbook from '../../components/mypage/workbook';
import Review from '../../components/mypage/review';

const MyPage = () => {
  const [searchParams, _] = useSearchParams();
  const service = searchParams.get('service');

  const checkActiveService = (curService: string) => {
    if (curService === service) return true;

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
            <MyPageLink to="/test/new">시험지 만들기</MyPageLink>
          </LinkList>
        </MobileContainer>

        <MobileContainer>
          <CategoryTitle>나의 서비스</CategoryTitle>
          <CategoryList>
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
            <CategoryItem isActive={checkActiveService(SERVICE_ROUTE.test)}>
              <CategoryLink to={`/mypage?service=${SERVICE_ROUTE.test}`}>
                <span>나의 시험</span>
                {checkActiveService(SERVICE_ROUTE.test) && (
                  <span>
                    <BsCheckLg />
                  </span>
                )}
              </CategoryLink>
            </CategoryItem>
            <CategoryItem isActive={checkActiveService(SERVICE_ROUTE.testpaper)}>
              <CategoryLink to={`/mypage?service=${SERVICE_ROUTE.testpaper}`}>
                <span>나의 시험지</span>
                {checkActiveService(SERVICE_ROUTE.testpaper) && (
                  <span>
                    <BsCheckLg />
                  </span>
                )}
              </CategoryLink>
            </CategoryItem>
            <CategoryItem isActive={checkActiveService(SERVICE_ROUTE.review)}>
              <CategoryLink to={`/mypage?service=${SERVICE_ROUTE.review}`}>
                <span>오답노트</span>
                {checkActiveService(SERVICE_ROUTE.review) && (
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
        {service === SERVICE_ROUTE.testpaper && <TestPaper />}
        {service === SERVICE_ROUTE.test && <Test />}
        {service === SERVICE_ROUTE.workbook && <MypageWorkbook type={MYPAGE_TYPE.나의문제집} />}
        {service === SERVICE_ROUTE.share && <MypageWorkbook type={MYPAGE_TYPE.공유받은문제집} />}
        {service === SERVICE_ROUTE.review && <Review />}
      </ContentsContainer>
    </Container>
  );
};

export default MyPage;
