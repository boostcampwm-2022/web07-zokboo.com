import axios from 'axios';
import PostCreateQuestionBody from '../../types/question';

const baseUrl = process.env.REACT_APP_BASE_URL;

const createQuestion = async (body: PostCreateQuestionBody) => {
  const { data } = await axios.post(`${baseUrl}/question`, body, { withCredentials: true });

  return data;
};

export default createQuestion;
