import { useState } from 'react';
import { useQuery } from 'react-query';
import { getMyWorkbookData } from '../../../api/workbook';
import SearchWorkbookType from '../../../types/search';
import { MYPAGE_TYPE } from '../../../utils/constants';
import Loading from '../../common/Loading';
import Error from '../../common/utils/Error';
import SearchResultItem from '../../search/SearchResultItem';

import { Header, WorkbookContainer } from './Style';

interface MypageWorkbookProps {
  type: string;
}

const MypageWorkbook = ({ type }: MypageWorkbookProps) => {
  const [workbookData, setWorkbookData] = useState<SearchWorkbookType[]>([]);
  const { isLoading, isSuccess, data } = useQuery([type], getMyWorkbookData, {
    onSuccess: (d) => {
      setWorkbookData(d.data);
      console.log(d.msg);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <WorkbookContainer>
      <Header>{type === MYPAGE_TYPE.공유받은문제집 ? '공유 받은 문제집' : '나의 문제집'}</Header>
      {isLoading && <Loading />}
      {isSuccess &&
        (workbookData.length !== 0 ? (
          workbookData.map((workbook, index) => (
            <SearchResultItem
              key={workbook.workbookId}
              workbookId={workbook.workbookId}
              title={workbook.title}
              description={workbook.description}
              questionCount={workbook.questionCount}
            />
          ))
        ) : (
          <Error message="문제집이 없습니다." />
        ))}
    </WorkbookContainer>
  );
};

export default MypageWorkbook;
