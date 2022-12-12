export const SERVER_URL = process.env.REACT_APP_BASE_URL;

export const QUESTION_TYPE = {
  multiple: 'MULTIPLE',
  subjective: 'SUBJECTIVE',
};

export const MYPAGE_TYPE = {
  나의문제집: 'my',
  공유받은문제집: 'saved',
  나의시험지: 'my_test',
};

export const ALLOW_FILE_EXTENSION = ['jpg', 'jpeg', 'png'];
export const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024;
