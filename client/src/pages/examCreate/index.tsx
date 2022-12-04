import MainTitle from '../../components/common/mainTitle/MainTitle';
import Modal from '../../components/modal';
import SearchWorkbookModal from '../../components/modal/searchWorkbook';
import useToggle from '../../hooks/useToggle';
import { Button, Input, SubTitle } from '../../styles/common';
import {
  Container,
  InfoBox,
  InfoContainer,
  InfoInput,
  InfoInputBox,
  InfoText,
  InfoTimeInput,
  WorkbookBox,
  WorkbookContainer,
  WorkbookDeleteButton,
  WorkbookDesc,
  WorkbookHeader,
  WorkbookInfo,
  WorkbookInput,
  WorkbookItem,
  WorkbookList,
  WorkbookTitle,
} from './Style';

const ExamCreate = () => {
  const [isAddModal, onAddModalToggle] = useToggle(false);

  return (
    <>
      <MainTitle title="시험 만들기" />
      <Container>
        <InfoContainer>
          <InfoBox>
            <SubTitle>시험명</SubTitle>
            <InfoInput />
          </InfoBox>
          <InfoBox>
            <SubTitle>시험 시간</SubTitle>
            <InfoInputBox>
              <InfoTimeInput /> <InfoText>분</InfoText>
              <InfoTimeInput /> <InfoText>초</InfoText>
            </InfoInputBox>
          </InfoBox>
        </InfoContainer>

        <WorkbookContainer>
          <WorkbookBox>
            <SubTitle>문제집 추가</SubTitle>
            <Button onClick={onAddModalToggle}>추가</Button>
          </WorkbookBox>

          <WorkbookList>
            <WorkbookHeader>
              <div>문제집 정보</div>
              <div>문제수</div>
            </WorkbookHeader>
            <WorkbookItem>
              <WorkbookInfo>
                <WorkbookBox>
                  <WorkbookTitle>
                    긴긴 제목이다~!긴 제목이다~!긴 제목이다~!긴 제목이다~!긴 제목이다~!긴 제목이다~!긴 제목이다~!긴
                    제목이다~!긴 제목이다~! 제목이다~!
                  </WorkbookTitle>
                  <WorkbookDeleteButton>제거</WorkbookDeleteButton>
                </WorkbookBox>
                <WorkbookDesc>
                  길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다
                  길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다
                  길어~!길다 길어~!길다 길어~!
                </WorkbookDesc>
              </WorkbookInfo>

              <WorkbookInput />
            </WorkbookItem>
            <WorkbookItem>
              <WorkbookInfo>
                <WorkbookBox>
                  <WorkbookTitle>
                    긴긴 제목이다~!긴 제목이다~!긴 제목이다~!긴 제목이다~!긴 제목이다~!긴 제목이다~!긴 제목이다~!긴
                    제목이다~!긴 제목이다~! 제목이다~!
                  </WorkbookTitle>
                  <WorkbookDeleteButton>제거</WorkbookDeleteButton>
                </WorkbookBox>
                <WorkbookDesc>
                  길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다
                  길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다
                  길어~!길다 길어~!길다 길어~!
                </WorkbookDesc>
              </WorkbookInfo>

              <WorkbookInput />
            </WorkbookItem>
            <WorkbookItem>
              <WorkbookInfo>
                <WorkbookBox>
                  <WorkbookTitle>
                    긴긴 제목이다~!긴 제목이다~!긴 제목이다~!긴 제목이다~!긴 제목이다~!긴 제목이다~!긴 제목이다~!긴
                    제목이다~!긴 제목이다~! 제목이다~!
                  </WorkbookTitle>
                  <WorkbookDeleteButton>제거</WorkbookDeleteButton>
                </WorkbookBox>
                <WorkbookDesc>
                  길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다
                  길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다
                  길어~!길다 길어~!길다 길어~!
                </WorkbookDesc>
              </WorkbookInfo>

              <WorkbookInput />
            </WorkbookItem>
            <WorkbookItem>
              <WorkbookInfo>
                <WorkbookBox>
                  <WorkbookTitle>
                    긴긴 제목이다~!긴 제목이다~!긴 제목이다~!긴 제목이다~!긴 제목이다~!긴 제목이다~!긴 제목이다~!긴
                    제목이다~!긴 제목이다~! 제목이다~!
                  </WorkbookTitle>
                  <WorkbookDeleteButton>제거</WorkbookDeleteButton>
                </WorkbookBox>
                <WorkbookDesc>
                  길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다
                  길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다 길어~!길다
                  길어~!길다 길어~!길다 길어~!
                </WorkbookDesc>
              </WorkbookInfo>

              <WorkbookInput />
            </WorkbookItem>
          </WorkbookList>
        </WorkbookContainer>
      </Container>

      {isAddModal && (
        <Modal onToggle={onAddModalToggle}>
          <SearchWorkbookModal />
        </Modal>
      )}
    </>
  );
};

export default ExamCreate;
