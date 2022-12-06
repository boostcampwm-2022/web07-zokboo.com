import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
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
  msg: string;
  data: {
    workbookId: number;
    title: string;
    description: string;
    isPublic: boolean;
    questions: Question[] | Question;
  };
}

const WorkbookDetail = () => {
  const [workbookData, setWorkbookData] = useState<Workbook>();
  const [searchParams, setSearchParams] = useSearchParams();
  const workbookId = searchParams.get('id');

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/workbooks/${workbookId}`)
      .then((res) => res.data)
      .then((data) => setWorkbookData(data));
  });

  return (
    <PageContainer>
      <TitleContainer>
        <Title>제목 : {workbookData?.data.title}</Title>
        <IsPublic>public</IsPublic>
      </TitleContainer>
      <Description>설명</Description>
      <ProblemList>
        <Problem>문제 1</Problem>
        <Problem>문제 2</Problem>
        <Problem>문제 3</Problem>
        <Problem>문제 4</Problem>
      </ProblemList>
    </PageContainer>
  );
};

export default WorkbookDetail;
