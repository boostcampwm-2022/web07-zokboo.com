import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { checkEmailAuth } from '../../api/auth';
import Loading from '../../components/common/Loading';
import KEYS from '../../react-query/keys/auth';
import { Container, Contents, Inner, LoadingContainer, Title } from './Style';

const EmailAuth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [count, setCount] = useState(3);

  const token = searchParams.get('token');

  const { isSuccess } = useQuery([KEYS.email, token], checkEmailAuth, {
    enabled: token !== null,
    onSuccess: () => {
      toast.success('이메일 인증이 완료되었습니다.');
      // navigate('/home');
      let cnt = 0;
      const interval = setInterval(() => {
        setCount((prev) => prev - 1);
        cnt += 1;

        if (cnt === 3) {
          clearInterval(interval);
          navigate('/home');
        }
      }, 1000);
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
      navigate('/home');
    },
  });

  useEffect(() => {
    if (!token) {
      toast.error('잘못된 접근입니다.');
      navigate('/home');
    }
  }, []);

  return (
    <Container>
      <Inner isShow={!isSuccess}>
        <Title>
          이메일 <strong>인증</strong> 확인 중 입니다.
        </Title>

        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      </Inner>

      <Inner isShow={isSuccess}>
        <Title>
          계정 <strong>인증</strong>이 완료되었습니다.
        </Title>
        <Contents>{count}초 뒤 메인 페이지로 이동합니다.</Contents>
      </Inner>
    </Container>
  );
};

export default EmailAuth;
