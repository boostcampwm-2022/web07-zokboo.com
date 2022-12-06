import { rest } from 'msw';
import PostCreateTestBody from '../../types/test';
import { SERVER_URL } from '../../utils/constants';

export default [
  rest.post<PostCreateTestBody>(`${SERVER_URL}/tests`, (req, res, ctx) => {
    const { title, minute, second, workbooks } = req.body;

    if (title) {
      return res(ctx.status(200));
    }
    return res(ctx.status(400));
  }),
];
