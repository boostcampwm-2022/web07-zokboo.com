import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMyWorkbookData } from '../../api/workbook';
import { fonts } from '../../styles/theme';
import SearchWorkbookType from '../../types/search';
import { MYPAGE_TYPE } from '../../utils/constants';
import WorkbookItem from '../workbookItem/WorkbookItem';
import Loading from './Loading';
import NoSearchResult from './NoSearchResult';

const WorkbookContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const Header = styled.div`
  font-size: ${fonts.size.xl};
  font-weight: ${fonts.weight.normal};
`;

const Main = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: ${fonts.weight.bold};
  font-size: ${fonts.size.xl};
`;

interface MypageWorkbookProps {
  type: string;
}

const MypageWorkbook = ({ type }: MypageWorkbookProps) => {
  const [workbookData, setWorkbookData] = useState<SearchWorkbookType[]>([]);
  const { isLoading, isSuccess } = useQuery([type], getMyWorkbookData, {
    onSuccess: (d) => {
      setWorkbookData(d.data);
    },
  });

  return (
    <WorkbookContainer>
      <Header>{type === MYPAGE_TYPE.공유받은문제집 ? '공유 받은 문제집' : '나의 문제집'}</Header>
      <Main>
        {isLoading && <Loading />}
        {isSuccess &&
          (workbookData.length !== 0 ? (
            workbookData.map((workbook) => (
              <WorkbookItem
                key={workbook.workbookId}
                workbookId={workbook.workbookId}
                title={workbook.title}
                description={workbook.description}
                questionCount={workbook.questionCount}
              />
            ))
          ) : (
            <NoSearchResult />
          ))}
      </Main>
    </WorkbookContainer>
  );
};

export default MypageWorkbook;
