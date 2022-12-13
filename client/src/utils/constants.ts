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

export const VERIFICATION = {
  id: /^[a-z]+[a-z0-9]{6,16}$/g,
  pw: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*=-])(?=.*[0-9]).{8,16}$/,
  email: /[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
};
