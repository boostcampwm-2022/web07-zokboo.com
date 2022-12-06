import axios from 'axios';
import { QueryFunctionContext } from 'react-query';
import { DEV_SERVER_URL, SERVER_URL } from '../utils/constants';

export const getSearchData = async ({ queryKey }: QueryFunctionContext) => {
  const [_key, searchWord] = queryKey;
  const { data } = await axios
    .get(`${DEV_SERVER_URL}/workbooks/search`, { params: { title: searchWord, content: '213123213' } })
    .catch((err) => err.response);

  return data;
};

export const getMockSearchData = async ({ queryKey }: QueryFunctionContext) => {
  const [_key, searchWord] = queryKey;
  const { data } = await axios
    .get(`/workbooks/search`, { params: { title: searchWord, content: '213123213' } })
    .catch((err) => err.response);

  return data;
};
