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
  const { isLoading, isSuccess, data, isError } = useQuery([type], getMyWorkbookData, {
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
          workbookData.map((workbook) => {
            const { workbookId, title, description } = workbook;
            const workbookCount = workbook.questions ? workbook.questions.length : workbook.questionCount;
            return (
              <SearchResultItem
                key={workbookId}
                workbookId={workbookId}
                title={title}
                description={description}
                questionCount={workbookCount}
                type={type}
              />
            );
          })
        ) : (
          <Error message="이런, 문제집이 없습니다." />
        ))}
      {isError && <Error emoji="🫠" message="Error! 문제집을 불러올 수 없습니다. J021에게 문의해주세요." />}
    </WorkbookContainer>
  );
};

export default MypageWorkbook;
