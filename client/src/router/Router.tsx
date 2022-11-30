import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/header/Header';

import Exam from '../pages/Exam';
import ExamCreate from '../pages/ExamCreate';
import FindId from '../pages/FindId/FindId';
import FindPw from '../pages/findPw/FindPw';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import MyPage from '../pages/mypage/MyPage';
import PageNotFound from '../pages/PageNotFound';
import Problem from '../pages/Problem';
import WorkBookCreate from '../pages/workBookCreate/WorkBookCreate';
import Review from '../pages/Review';
import Search from '../pages/Search';
import SignUp from '../pages/signup/SignUp';

const Router = () => {
  return (
    <BrowserRouter>
      {/* Header */}

      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/workbook/new" element={<Header />} />
        <Route path="/mypage" element={<Header />} />
      </Routes>

      {/* Contents */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/workbook/new" element={<WorkBookCreate />} />
        <Route path="/workbook/update" element={<WorkBookCreate />} />
        <Route path="/workbook/:id " element={<Problem />} />
        <Route path="/exam_create" element={<ExamCreate />} />
        <Route path="/exam/:id" element={<Exam />} />
        <Route path="/review/:id" element={<Review />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/find_id" element={<FindId />} />
        <Route path="/find_pw" element={<FindPw />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
