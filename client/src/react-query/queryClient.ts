import { QueryClient } from 'react-query';
import { toast } from 'react-toastify';

interface Response {
  response: {
    data: {
      message: string;
    };
  };
}

const queryErrorHandler = (error: unknown) => {
  const customError = error as Response;

  toast.error(customError.response.data.message);
};

const generateQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0, // 0
        cacheTime: 1000 * 5 * 60, // 5 min

        retry: 1,

        // refetchOnWindowFocus: false, // 화면 전환 시
        // refetchOnMount: false, // 페이지(컴포넌트)가 다시 마운트 될 시
        // refetchOnReconnect: false, // 네트워크 다시 연결될 시

        onError: queryErrorHandler,
      },
      mutations: {
        onError: queryErrorHandler,
      },
    },
  });
};

export default generateQueryClient();
