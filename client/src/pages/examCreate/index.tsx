import MainTitle from '../../components/common/mainTitle/MainTitle';
import { Button, Input, SubTitle } from '../../styles/common';
import {
  Container,
  InfoBox,
  InfoContainer,
  InfoInput,
  WorkbookBox,
  WorkbookContainer,
  WorkbookDeleteButton,
  WorkbookDesc,
  WorkbookInfo,
  WorkbookInput,
  WorkbookItem,
  WorkbookList,
  WorkbookTitle,
} from './Style';

const ExamCreate = () => {
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
            <InfoInput />
          </InfoBox>
        </InfoContainer>

        <WorkbookContainer>
          <WorkbookBox>
            <SubTitle>문제집 추가</SubTitle>
            <Button>추가</Button>
          </WorkbookBox>

          <WorkbookList>
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
    </>
  );
};

export default ExamCreate;
