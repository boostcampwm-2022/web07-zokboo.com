import styled from 'styled-components';
import CommonButtonComponent from '../components/common/Button';
import Toggle from '../components/common/Toggle';
import { colors, device, fonts, paddings, widths } from '../styles/theme';

const ProblemCreateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  box-sizing: border-box;
  width: ${widths.base};
  padding: ${paddings.responsive};

  margin: 120px auto 20px;

  @media screen and (max-width: ${device.tablet}) {
    width: ${widths.responsive};
  }
`;

const ProblemListContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 45%;

  @media screen and (max-width: ${device.tablet}) {
    width: ${widths.responsive};
  }
`;

const ProblemCreateForm = styled.form`
  width: 45%;

  @media screen and (max-width: ${device.tablet}) {
    width: ${widths.responsive};
  }
`;

const ProblemCreateFormItem = styled.div`
  h2 {
    font-size: ${fonts.size.xl};
    margin: 24px 0 16px;
  }
`;

const ProblemCreateFormToggle = styled.div`
  width: 40px;
  height: 20px;
`;

const ProblemCreateFormInput = styled.input`
  width: 100%;
  height: 48px;

  color: ${colors.text};
  font-size: ${fonts.size.sm};

  border: 1px solid ${colors.line};
  border-radius: 5px;

  box-sizing: border-box;
  padding: 0px 16px;

  ::placeholder {
    color: ${colors.placeholder};
  }

  :focus {
    outline: none;
  }
`;

const ProblemCreateFormButton = styled.div`
  width: 200px;
  height: 50px;

  margin: 50px auto 0;
`;

const ProblemCreateButtonList = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ProblemCreateButton = styled.div`
  width: 80px;
  height: 40px;

  margin-left: 10px;
`;

const ProblemList = styled.div`
  width: 100%;
  height: 460px;

  box-sizing: border-box;
  padding: 0px 10px;

  border: 2px solid ${colors.gray2};
  border-radius: 10px;

  overflow-y: scroll;
`;
const ProblemItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 100px;

  box-sizing: border-box;
  padding: 10px;

  margin: 10px 0;

  background-color: ${colors.gray1};
  border-radius: 10px;
`;

const ProblemItemTitle = styled.h3`
  display: inline-block;
  width: 90%;
  height: 2.4em;
  line-height: 1.2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  font-size: ${fonts.size.sm};
  margin: 0;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  white-space: normal;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
`;

const ProblemItemUnderLine = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProblemItemHashTagList = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const ProblemItemHashTagItem = styled.span`
  width: 50px;

  font-size: ${fonts.size.xs};
`;

const ProblemCreate = () => {
  return (
    <ProblemCreateContainer>
      <ProblemCreateForm>
        <ProblemCreateFormItem>
          <h2>문제집 제목</h2>
          <ProblemCreateFormInput type="text" id="title" placeholder="문제집 제목을 입력하세요." />
        </ProblemCreateFormItem>
        <ProblemCreateFormItem>
          <h2>카테고리</h2>
          <ProblemCreateFormInput type="text" id="category" placeholder="카테고리를 입력하세요." />
        </ProblemCreateFormItem>
        <ProblemCreateFormItem>
          <h2>공유</h2>
          <ProblemCreateFormToggle>
            <Toggle />
          </ProblemCreateFormToggle>
        </ProblemCreateFormItem>

        <ProblemCreateFormButton>
          <CommonButtonComponent buttonText="문제집 생성 / 수정" />
        </ProblemCreateFormButton>
      </ProblemCreateForm>

      <ProblemListContainer>
        <ProblemCreateButtonList>
          <ProblemCreateButton>
            <CommonButtonComponent buttonText="문제 검색" />
          </ProblemCreateButton>
          <ProblemCreateButton>
            <CommonButtonComponent buttonText="문제 추가" />
          </ProblemCreateButton>
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
              <CommonButtonComponent buttonText="제거" />
            </ProblemItemUnderLine>
          </ProblemItem>
          <ProblemItem>
            <ProblemItemTitle>짧은 모시깽이 입니다. 짧은 모시깽이 입니다. 짧은 모시깽이 입니다. </ProblemItemTitle>
            <ProblemItemUnderLine>
              <ProblemItemHashTagList>
                <ProblemItemHashTagItem>자료구조</ProblemItemHashTagItem>
                <ProblemItemHashTagItem>스택</ProblemItemHashTagItem>
                <ProblemItemHashTagItem>큐</ProblemItemHashTagItem>
                <ProblemItemHashTagItem>잘 모르는 아무튼 긴거</ProblemItemHashTagItem>
              </ProblemItemHashTagList>
              <CommonButtonComponent buttonText="제거" />
            </ProblemItemUnderLine>
          </ProblemItem>
          <ProblemItem>123</ProblemItem>
          <ProblemItem>123</ProblemItem>
          <ProblemItem>123</ProblemItem>
          <ProblemItem>123</ProblemItem>
        </ProblemList>
      </ProblemListContainer>
    </ProblemCreateContainer>
  );
};

export default ProblemCreate;
