import { rest } from 'msw';
import { PostCreateQuestionBody } from '../../../types/workbook';

const baseUrl = process.env.REACT_APP_BASE_URL;
let tempId = 0;

export default [
  rest.post<PostCreateQuestionBody>(`${baseUrl}/questions`, (req, res, ctx) => {
    const { question, questionType, answer, commentary, difficulty, hashtags } = req.body;
    const { userId } = req.cookies;
    tempId += 1;

    if (userId)
      return res(ctx.status(200), ctx.json({ questionId: tempId, question, questionType, difficulty, hashtags }));
    return res(ctx.status(400), ctx.cookie('userId', 'SeoJaeWan'));
  }),
];
