import { AiOutlineCheck } from '@react-icons/all-files/ai/AiOutlineCheck';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
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
  UserImageLabel,
  UserInfoBox,
} from './Style';
import useUserData from '../../hooks/useUserData';
import { Input } from '../../styles/common';
import updateProfileImage from '../../api/user';
import { MYPAGE_TYPE, SERVICE_ROUTE, ALLOW_FILE_EXTENSION, FILE_SIZE_MAX_LIMIT } from '../../utils/constants';
import TestPaper from '../../components/mypage/testPaper';
import Test from '../../components/mypage/test';
import MypageWorkbook from '../../components/mypage/workbook';
import Review from '../../components/mypage/review';
import { PatchUpdateUserProfile } from '../../types/user';
import { updateUser } from '../../redux/login/slice';

const MyPage = () => {
  const userData = useUserData();
  const [searchParams] = useSearchParams();
  const service = searchParams.get('service');
  const dispatch = useDispatch();

  const updateProfileImageMutation = useMutation(updateProfileImage);

  const checkActiveService = (curService: string) => {
    if (curService === service) return true;

    return false;
  };

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const { files } = target;

    if (!files) {
      return;
    }

    const uploadFile = files[0];
    if (!ALLOW_FILE_EXTENSION.includes(uploadFile.type.replace('image/', ''))) {
      toast.error(`사용 가능한 확장자가 아닙니다. (가능한 확장자 : ${ALLOW_FILE_EXTENSION.join(' ')})`);
      target.value = '';
      return;
    }

    if (uploadFile.size > FILE_SIZE_MAX_LIMIT) {
      toast.error('업로드 가능한 최대 용량은 5MB입니다.');
      target.value = '';
      return;
    }

    const formData = new FormData();

    formData.append('profile', uploadFile);

    updateProfileImageMutation.mutate(formData, {
      onSuccess: ({ data }: PatchUpdateUserProfile) => {
        dispatch(updateUser({ avatar: data.avatar }));
      },
    });
  };

  return (
    <Container>
      <SideContainer>
        <MobileContainer>
          <UserContainer>
            <UserImageLabel htmlFor="file">
              <Input type="file" hidden id="file" onChange={handleProfileImageChange} />
              <img src={userData.avatar} alt="profile" />
            </UserImageLabel>
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
            <CategoryItem isActive={checkActiveService(SERVICE_ROUTE.workbook)}>
              <CategoryLink to={`/mypage?service=${SERVICE_ROUTE.workbook}`}>
                <span>나의 문제집</span>
                {checkActiveService(SERVICE_ROUTE.workbook) && (
                  <span>
                    <AiOutlineCheck />
                  </span>
                )}
              </CategoryLink>
            </CategoryItem>
            <CategoryItem isActive={checkActiveService(SERVICE_ROUTE.share)}>
              <CategoryLink to={`/mypage?service=${SERVICE_ROUTE.share}`}>
                <span>공유 받은 문제집</span>
                {checkActiveService(SERVICE_ROUTE.share) && (
                  <span>
                    <AiOutlineCheck />
                  </span>
                )}
              </CategoryLink>
            </CategoryItem>
            <CategoryItem isActive={checkActiveService(SERVICE_ROUTE.test)}>
              <CategoryLink to={`/mypage?service=${SERVICE_ROUTE.test}`}>
                <span>나의 시험</span>
                {checkActiveService(SERVICE_ROUTE.test) && (
                  <span>
                    <AiOutlineCheck />
                  </span>
                )}
              </CategoryLink>
            </CategoryItem>
            <CategoryItem isActive={checkActiveService(SERVICE_ROUTE.testpaper)}>
              <CategoryLink to={`/mypage?service=${SERVICE_ROUTE.testpaper}`}>
                <span>나의 시험지</span>
                {checkActiveService(SERVICE_ROUTE.testpaper) && (
                  <span>
                    <AiOutlineCheck />
                  </span>
                )}
              </CategoryLink>
            </CategoryItem>
            <CategoryItem isActive={checkActiveService(SERVICE_ROUTE.review)}>
              <CategoryLink to={`/mypage?service=${SERVICE_ROUTE.review}`}>
                <span>오답노트</span>
                {checkActiveService(SERVICE_ROUTE.review) && (
                  <span>
                    <AiOutlineCheck />
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
