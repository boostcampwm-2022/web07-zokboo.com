import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import reportWebVitals from './reportWebVitals';
import worker from './mocks/worker';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // 0
      cacheTime: 1000 * 5 * 60, // 5 min

      retry: 3,

      // refetchOnWindowFocus: false, // 화면 전환 시
      // refetchOnMount: false, // 페이지(컴포넌트)가 다시 마운트 될 시
      // refetchOnReconnect: false, // 네트워크 다시 연결될 시
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
