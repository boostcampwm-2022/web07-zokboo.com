import CommonButtonComponent from '../../components/common/Button';
import MainTitle from '../../components/common/mainTitle/MainTitle';
import Toggle from '../../components/common/Toggle';
import Modal from '../../components/modal';
import useToggle from '../../hooks/useToggle';
import { SubTitle } from '../../styles/common';
import {
  ListButton,
  ButtonList,
  Container,
  Form,
  FormButton,
  FormInput,
  FormItem,
  FormToggle,
  ProblemItem,
  ProblemItemButton,
  ProblemItemHashTagItem,
  ProblemItemHashTagList,
  ProblemItemTitle,
  ProblemItemUnderLine,
  ProblemList,
  ProblemListContainer,
} from './Style';

const ProblemCreate = () => {
  const [isCreateModal, onCreateModalToggle] = useToggle(false);
  const [isSearchModal, onSearchModalToggle] = useToggle(false);

  return (
    <>
      <MainTitle title="문제집 만들기" />
      <Container>
        <Form>
          <FormItem>
            <SubTitle>문제집 제목</SubTitle>
            <FormInput type="text" id="title" placeholder="문제집 제목을 입력하세요." />
          </FormItem>
          <FormItem>
            <SubTitle>카테고리</SubTitle>
            <FormInput type="text" id="category" placeholder="카테고리를 입력하세요." />
          </FormItem>
          <FormItem>
            <SubTitle>공유</SubTitle>
            <FormToggle>
              <Toggle />
            </FormToggle>
          </FormItem>

          <FormButton>문제집 생성</FormButton>
        </Form>

        <ProblemListContainer>
          <ButtonList>
            <ListButton>
              <CommonButtonComponent buttonText="문제 검색" buttonWidth="100px" />
            </ListButton>
            <ListButton onClick={onCreateModalToggle}>문제 추가</ListButton>
          </ButtonList>

          <ProblemList>
            <ProblemItem>
              <ProblemItemTitle>
                정말 긴 모시깽이 입니다 정말 긴 모시깽이 입니다 정말 긴 모시깽이 입니다 정말 긴 모시깽이 입니다 정말 긴
                모시깽이 입니다
              </ProblemItemTitle>
              <ProblemItemUnderLine>
                <ProblemItemHashTagList>
                  <ProblemItemHashTagItem>1</ProblemItemHashTagItem>
                </ProblemItemHashTagList>
                <ProblemItemButton>제거</ProblemItemButton>
              </ProblemItemUnderLine>
            </ProblemItem>
          </ProblemList>
        </ProblemListContainer>
      </Container>

      {isCreateModal && <Modal type="create" onToggle={onCreateModalToggle} />}
      {isSearchModal && <Modal type="search" onToggle={onSearchModalToggle} />}
    </>
  );
};

export default ProblemCreate;
