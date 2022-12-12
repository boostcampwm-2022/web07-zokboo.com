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
import SERVICE_ROUTE from './constants';
import MypageWorkbook from '../../components/mypage/Workbook';
import { MYPAGE_TYPE } from '../../utils/constants';
import useUserData from '../../hooks/useUserData';

const MyPage = () => {
  const userData = useUserData();
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
              <img src={userData.avatar} alt="profile" />
            </UserImageBox>
            <UserInfoBox>
              <span>{userData.nickname}</span> 반갑습니다.
            </UserInfoBox>
          </UserContainer>

          <LinkList>
            <MyPageLink to="/workbook/new">문제집 만들기</MyPageLink>
            <MyPageLink to="/test/new">시험 만들기</MyPageLink>
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
        {service === SERVICE_ROUTE.test && <div>나의 시험지{/** 아직 컴포넌트 미제작 */}</div>}
        {service === SERVICE_ROUTE.workbook && <MypageWorkbook type={MYPAGE_TYPE.나의문제집} />}
        {service === SERVICE_ROUTE.share && <MypageWorkbook type={MYPAGE_TYPE.공유받은문제집} />}
      </ContentsContainer>
    </Container>
  );
};

export default MyPage;
