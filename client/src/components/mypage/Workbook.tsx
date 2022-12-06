import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fonts } from '../../styles/theme';
import SearchWorkbookType from '../../types/search';
import WorkbookItem from '../workbookItem/WorkbookItem';

const WorkbookContainer = styled.div``;
const Header = styled.div`
  font-size: ${fonts.size.xl};
  font-weight: ${fonts.weight.normal};
`;

interface MypageWorkbookProps {
  type: string;
}

const MypageWorkbook = ({ type }: MypageWorkbookProps) => {
  const [workbookData, setWorkbookData] = useState<SearchWorkbookType[]>([]);

  useEffect(() => {
    if (type === 'shared') {
      /** 공유받은 문제집 요청 쿼리 */
    } else {
      /** 나의 문제집 요청 쿼리 */
    }

    // temp
    axios
      .get('/search')
      .then((res) => res.data)
      .then((data) => setWorkbookData(data));
    //
  }, []);

  return (
    <WorkbookContainer>
      <Header>{type === 'shared' ? '공유 받은 문제집' : '나의 문제집'}</Header>
      {workbookData.map((workbook, index) => (
        <WorkbookItem
          key={workbook.workbookId}
          workbookId={workbook.workbookId}
          title={workbook.title}
          description={workbook.description}
          questionCount={workbook.questionCount}
        />
      ))}
    </WorkbookContainer>
  );
};

export default MypageWorkbook;
