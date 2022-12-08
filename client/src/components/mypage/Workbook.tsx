import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMyWorkbookData } from '../../api/workbook';
import { fonts } from '../../styles/theme';
import SearchWorkbookType from '../../types/search';
import { MYPAGE_TYPE } from '../../utils/constants';
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
  const { isLoading, isSuccess, data } = useQuery([type], getMyWorkbookData, {
    onSuccess: (d) => {
      setWorkbookData(d.data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <WorkbookContainer>
      <Header>{type === MYPAGE_TYPE.공유받은문제집 ? '공유 받은 문제집' : '나의 문제집'}</Header>
      {isLoading && '로딩중'}
      {isSuccess &&
        (workbookData.length !== 0
          ? workbookData.map((workbook, index) => (
              <WorkbookItem
                key={workbook.workbookId}
                workbookId={workbook.workbookId}
                title={workbook.title}
                description={workbook.description}
                questionCount={workbook.questionCount}
              />
            ))
          : '문제집이 없습니다')}
    </WorkbookContainer>
  );
};

export default MypageWorkbook;
