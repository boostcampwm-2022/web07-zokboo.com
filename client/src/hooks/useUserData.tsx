import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import selectUserData from '../redux/user/selector';

const useUserData = () => {
  const userData = useAppSelector(selectUserData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData.isLogined) {
      navigate('/init');
    }
  }, [userData]);

  return userData;
};

export default useUserData;
