import { QueryFunctionContext } from 'react-query';
import axios from './index';
import SEARCH_TYPE from '../pages/search/constants';
import { SERVER_URL } from '../utils/constants';

export const getSearchData = async ({ queryKey }: QueryFunctionContext) => {
  const searchWord = queryKey[1];
  const searchType = queryKey[2];

  // 더 나은 방법이 없을까?
  const params = (() => {
    if (searchType === SEARCH_TYPE.title) {
      return { title: searchWord };
    }
    if (searchType === SEARCH_TYPE.content) {
      return { content: searchWord };
    }
    if (searchType === SEARCH_TYPE.title_content) {
      return { title: searchWord, content: searchWord };
    }
    return {};
  })();

  const { data } = await axios.get(`${SERVER_URL}/workbooks`, { params });

  return data;
};

export default getSearchData;
