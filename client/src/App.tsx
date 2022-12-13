import { ToastContainer } from 'react-toastify';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Router from './router/Router';
import queryClient from './react-query/queryClient';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <ReactQueryDevtools />
      <Router />
    </QueryClientProvider>
  );
};

export default App;
