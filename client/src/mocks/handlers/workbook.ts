import { rest } from 'msw';
import PostCreateWorkBookBody from '../../types/workbook';
import SERVER_URL from '../../utils/constants';

export default [
  rest.post<PostCreateWorkBookBody>(`${SERVER_URL}/workbooks`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
