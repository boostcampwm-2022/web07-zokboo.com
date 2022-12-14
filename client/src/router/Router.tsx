import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Loading from '../components/common/Loading';

const GlobalStyle = lazy(() => import('../styles/Global'));
const Header = lazy(() => import('../components/header'));
const Test = lazy(() => import('../pages/test'));
const TestCreate = lazy(() => import('../pages/testCreate'));
const FindId = lazy(() => import('../pages/FindId/FindId'));
const FindPw = lazy(() => import('../pages/findPw/FindPw'));
const Home = lazy(() => import('../pages/home'));
const Login = lazy(() => import('../pages/login'));
const Workbook = lazy(() => import('../pages/workbook'));
const Review = lazy(() => import('../pages/Review'));
const Search = lazy(() => import('../pages/search'));
const SignUp = lazy(() => import('../pages/signup'));
const WorkbookDetail = lazy(() => import('../pages/workbookDetail'));
const MyPage = lazy(() => import('../pages/mypage'));
const EmailAuth = lazy(() => import('../pages/emailAuth'));
const PasswordAuth = lazy(() => import('../pages/passwordAuth'));
const WorkbookCreate = lazy(() => import('../pages/workbookCreate'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));
const InitPage = lazy(() => import('../pages/initpage'));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <GlobalStyle />
        {/* Header */}
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/workbook/new" element={<Header />} />
          <Route path="/mypage" element={<Header />} />
          <Route path="/test/new" element={<Header />} />
          <Route path="/search" element={<Header />} />
          <Route path="/search/view" element={<Header />} />
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
          <Route path="/init" element={<InitPage />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
