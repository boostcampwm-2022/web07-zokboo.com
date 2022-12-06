import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { getWorkbookById } from '../../api/workbook';
import { colors, fonts, widths } from '../../styles/theme';
import { SERVER_URL } from '../../utils/constants';

const PageContainer = styled.div`
  width: ${widths.base};
  height: 100%;
  margin: 0 auto;
  margin-top: 30px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;

  margin: 10px;
  padding: 12px 16px;
  border: 1px solid ${colors.gray2};
  border-radius: 8px;
`;
const Title = styled.div``;
const IsPublic = styled.div`
  border: 0.5px solid black;
  font-size: ${fonts.size.xs};
  border-radius: 8px;
  padding: 2px 4px;
`;
const Description = styled.div``;
const ProblemList = styled.div``;
const Problem = styled.div``;

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
            <Title>{`제목 : ${data.title}`}</Title>
            <IsPublic>{data.isPublic ? 'public' : 'private'}</IsPublic>
          </TitleContainer>
          <Description>{data.description}</Description>
          <ProblemList>{JSON.stringify(data.questions)}</ProblemList>
        </>
      )}
    </PageContainer>
  );
};

export default WorkbookDetail;
