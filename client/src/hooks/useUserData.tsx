import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from '../redux/hooks';
import selectUserData from '../redux/login/selector';

const useUserData = () => {
  const userData = useAppSelector(selectUserData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData.isLogined) {
      navigate('/login');
      toast.error('로그인이 필요합니다.');
    }
  }, [userData]);

  return userData;
};

export default useUserData;
