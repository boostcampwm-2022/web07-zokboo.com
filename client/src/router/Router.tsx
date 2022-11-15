import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Exam from '../pages/Exam';
import ExamCreate from '../pages/ExamCreate';
import FindId from '../pages/FindId';
import FindPw from '../pages/FindPw';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MyPage from '../pages/MyPage';
import Problem from '../pages/Problem';
import ProblemCreate from '../pages/ProblemCreate';
import Review from '../pages/Review';
import Search from '../pages/Search';
import SignUp from '../pages/SignUp';
import GlobalStyle from '../styles/Global';

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      {/* Header */}
      {/* 
      <Routes>
        <Route />
      </Routes> 
      */}

      {/* Contents */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/problem_create" element={<ProblemCreate />} />
        <Route path="/problem/:id " element={<Problem />} />
        <Route path="/exam_create" element={<ExamCreate />} />
        <Route path="/exam/:id" element={<Exam />} />
        <Route path="/review/:id" element={<Review />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/find_id" element={<FindId />} />
        <Route path="/find_pw" element={<FindPw />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
