import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import checkEmailAuth from '../../api/auth';
import Loading from '../../components/common/Loading';
import KEYS from '../../react-query/keys/auth';
import { Container, LoadingContainer, Title } from './Style';

const EmailAuth = () => {
  const [searchParams, _] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('token');

  useQuery([KEYS.email, token], checkEmailAuth, {
    enabled: token !== null,
    onSuccess: () => {
      toast.success('이메일 인증이 완료되었습니다.');
      navigate('/');
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
      navigate('/');
    },
  });

  useEffect(() => {
    if (!token) {
      toast.error('잘못된 접근입니다.');
      navigate('/');
    }
  }, []);

  return (
    <Container>
      <Title>
        이메일 <strong>인증</strong> 확인 중 입니다.
      </Title>
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    </Container>
  );
};

export default EmailAuth;
