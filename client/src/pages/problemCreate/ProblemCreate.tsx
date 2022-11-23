import styled from 'styled-components';
import CommonButtonComponent from '../../components/common/Button';
import MainTitle from '../../components/common/mainTitle/MainTitle';
import Toggle from '../../components/common/Toggle';
import Modal from '../../components/modal';
import CreateProblemModal from '../../components/modal/create';
import useToggle from '../../hooks/useToggle';
import { Button, SubTitle } from '../../styles/common';
import {
  ProblemCreateButton,
  ProblemCreateButtonList,
  ProblemCreateContainer,
  ProblemCreateForm,
  ProblemCreateFormButton,
  ProblemCreateFormInput,
  ProblemCreateFormItem,
  ProblemCreateFormToggle,
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

  return (
    <>
      <MainTitle title="문제집 만들기" />
      <ProblemCreateContainer>
        <ProblemCreateForm>
          <ProblemCreateFormItem>
            <SubTitle>문제집 제목</SubTitle>
            <ProblemCreateFormInput type="text" id="title" placeholder="문제집 제목을 입력하세요." />
          </ProblemCreateFormItem>
          <ProblemCreateFormItem>
            <SubTitle>카테고리</SubTitle>
            <ProblemCreateFormInput type="text" id="category" placeholder="카테고리를 입력하세요." />
          </ProblemCreateFormItem>
          <ProblemCreateFormItem>
            <SubTitle>공유</SubTitle>
            <ProblemCreateFormToggle>
              <Toggle />
            </ProblemCreateFormToggle>
          </ProblemCreateFormItem>

          <ProblemCreateFormButton>문제집 생성</ProblemCreateFormButton>
        </ProblemCreateForm>

        <ProblemListContainer>
          <ProblemCreateButtonList>
            <ProblemCreateButton>
              <CommonButtonComponent buttonText="문제 검색" buttonWidth="100px" />
            </ProblemCreateButton>
            <ProblemCreateButton onClick={onCreateModalToggle}>문제 추가</ProblemCreateButton>
          </ProblemCreateButtonList>

          <ProblemList>
            <ProblemItem>
              <ProblemItemTitle>
                정말 긴 모시깽이 입니다 정말 긴 모시깽이 입니다 정말 긴 모시깽이 입니다 정말 긴 모시깽이 입니다 정말 긴
                모시깽이 입니다 정말 긴 모시깽이 입니다 정말 긴 모시깽이 입니다 정말 긴 모시깽이 입니다 정말 긴 모시깽이
                입니다 정말 긴 모시깽이 입니다 정말 긴 모시깽이 입니다 정말 긴 모시깽이 입니다 정말 긴 모시깽이 입니다
                정말 긴 모시깽이 입니다 정말 긴 모시깽이 입니다 정말 긴 모시깽이 입니다 정말 긴 모시깽이 입니다 정말 긴
                모시깽이 입니다 정말 긴 모시깽이 입니다 정말 긴 모시깽이 입니다 정말 긴 모시깽이 입니다
              </ProblemItemTitle>
              <ProblemItemUnderLine>
                <ProblemItemHashTagList>
                  <ProblemItemHashTagItem>1</ProblemItemHashTagItem>
                </ProblemItemHashTagList>
                <ProblemItemButton>제거</ProblemItemButton>
              </ProblemItemUnderLine>
            </ProblemItem>
            <ProblemItem>
              <ProblemItemTitle>짧은 모시깽이 입니다. 짧은 모시깽이 입니다. 짧은 모시깽이 입니다. </ProblemItemTitle>
              <ProblemItemUnderLine>
                <ProblemItemHashTagList>
                  <ProblemItemHashTagItem>#자료구조</ProblemItemHashTagItem>
                  <ProblemItemHashTagItem>#스택</ProblemItemHashTagItem>
                  <ProblemItemHashTagItem>#큐</ProblemItemHashTagItem>
                  <ProblemItemHashTagItem>#잘 모르는 아무튼 긴거</ProblemItemHashTagItem>
                </ProblemItemHashTagList>
                <ProblemItemButton>제거</ProblemItemButton>
              </ProblemItemUnderLine>
            </ProblemItem>
            <ProblemItem>123</ProblemItem>
            <ProblemItem>123</ProblemItem>
            <ProblemItem>123</ProblemItem>
            <ProblemItem>123</ProblemItem>
          </ProblemList>
        </ProblemListContainer>
      </ProblemCreateContainer>

      {isCreateModal && <Modal type="create" onToggle={onCreateModalToggle} />}
    </>
  );
};

export default ProblemCreate;
