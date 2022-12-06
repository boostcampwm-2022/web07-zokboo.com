import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { getWorkbookById } from '../../api/workbook';
import ButtonComponent from '../../components/common/Button';
import { colors, fonts, media, widths } from '../../styles/theme';
import { SERVER_URL } from '../../utils/constants';
import SampleImage from '../../images/sample-image.jpeg';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  height: 100%;
  margin: 0 auto;
  margin-top: 30px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;

  background-color: ${colors.secondary};
  padding: 20px 0;
`;
const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 4px;
  padding-left: 34px;
`;
const RightContainer = styled.div`
  gap: 10px;
`;

const Title = styled.div`
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.3px;
  line-height: 1.5;
`;
const IsPublic = styled.div`
  display: inline-block;

  background-color: ${colors.primary};
  color: ${colors.white};

  border: none;
  border-radius: 4px;
  font-size: ${fonts.size.xs};
  font-weight: 500;
  padding: 2px 4px;
`;
const Description = styled.div`
  width: 400px;
`;
const ProblemList = styled.div``;
const Problem = styled.div`
  background-color: ${colors.gray4};
`;

interface Question {
  questionId: number;
  question: string;
  difficulty: number;
  answer: string;
  commentary: string;
  questionType: string;
  images: string[] | string;
  options: string[] | string;
  hashtags: string[] | string;
}

interface Workbook {
  workbookId: number;
  title: string;
  description: string;
  isPublic: boolean;
  questions: Question[];
}
interface WorkbookResponse {
  msg: string;
  data: Workbook[] | Workbook;
}

const WorkbookDetail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const workbookId = searchParams.get('id');
  const { isLoading, isSuccess, isError, data } = useQuery<Workbook>(['workbook', workbookId], getWorkbookById);

  return (
    <PageContainer>
      {isLoading && <div>로딩중</div>}
      {isError && <div>다시 시도해 주세요</div>}
      {isSuccess && (
        <>
          <TitleContainer>
            <LeftContainer>
              <img src={SampleImage} width="400px" alt="" />
            </LeftContainer>
            <RightContainer>
              <IsPublic>{data.isPublic ? 'public' : 'private'}</IsPublic>
              <Title>{`제목 : ${data.title}`}</Title>
              <Description>{data.description}asdasd123213213</Description>
              {/* <ButtonComponent buttonText="문제집 저장" /> */}
            </RightContainer>
          </TitleContainer>
          <Description>{data.description}</Description>
          <ProblemList>
            {data.questions.map((x, idx) => {
              return (
                <Problem key={x.questionId}>
                  <div>{x.question}</div>
                  <div>{x.difficulty}</div>
                  <div>{x.commentary}</div>
                  <div>{x.questionType}</div>
                  <div>{x.hashtags}</div>
                </Problem>
              );
            })}
          </ProblemList>
        </>
      )}
    </PageContainer>
  );
};

export default WorkbookDetail;
