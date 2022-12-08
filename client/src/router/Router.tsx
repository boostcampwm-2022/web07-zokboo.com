import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/header/Header';
import Test from '../pages/test';
import TestCreate from '../pages/testCreate';
import FindId from '../pages/FindId/FindId';
import FindPw from '../pages/findPw/FindPw';
import Home from '../pages/home';
import Login from '../pages/login';
import PageNotFound from '../pages/PageNotFound';
import Workbook from '../pages/workbook';
import Review from '../pages/Review';
import Search from '../pages/search';
import SignUp from '../pages/signup/SignUp';
import WorkbookDetail from '../pages/workbookDetail/WorkbookDetail';
import MyPage from '../pages/mypage';
import EmailAuth from '../pages/emailAuth';
import PasswordAuth from '../pages/passwordAuth';
import WorkbookCreate from '../pages/workBookCreate';

const Router = () => {
  return (
    <BrowserRouter>
      {/* Header */}
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/workbook/new" element={<Header />} />
        <Route path="/mypage" element={<Header />} />
        <Route path="/test/new" element={<Header />} />
        <Route path="/search" element={<Header />} />
      </Routes>

      {/* Contents */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/view" element={<WorkbookDetail />} />
        <Route path="/workbook/new" element={<WorkbookCreate />} />
        <Route path="/workbook/update" element={<WorkbookCreate />} />
        <Route path="/workbook/:workbookId" element={<Workbook />} />
        <Route path="/test/new" element={<TestCreate />} />
        <Route path="/test/:testId" element={<Test />} />
        <Route path="/review/:id" element={<Review />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/find_id" element={<FindId />} />
        <Route path="/find_pw" element={<FindPw />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/auth/email" element={<EmailAuth />} />
        <Route path="/auth/password" element={<PasswordAuth />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
