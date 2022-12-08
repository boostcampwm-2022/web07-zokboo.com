import axios from 'axios';
import { QueryFunctionContext } from 'react-query';
import SEARCH_TYPE from '../pages/search/constants';
import { SERVER_URL } from '../utils/constants';

export const getSearchData = async ({ queryKey }: QueryFunctionContext) => {
  const [_key, searchWord, searchType] = queryKey;

  // 더 나은 방법이 없을까?
  const params = (() => {
    if (searchType === SEARCH_TYPE.title) {
      return { title: searchWord, content: '' };
    }
    if (searchType === SEARCH_TYPE.content) {
      return { title: '', content: searchWord };
    }
    if (searchType === SEARCH_TYPE.title_content) {
      return { title: searchWord, content: searchWord };
    }
    return {};
  })();

  const { data } = await axios.get(`${SERVER_URL}/workbooks/search`, { params }).catch((err) => err.response);

  return data;
};

export const getMockSearchData = async ({ queryKey }: QueryFunctionContext) => {
  const [_key, searchWord, searchType] = queryKey;
  console.log(searchWord, searchType);
  const { data } = await axios
    .get(`/workbooks/search`, { params: { title: searchWord, content: '213123213' } })
    .catch((err) => err.response);

  return data;
};
