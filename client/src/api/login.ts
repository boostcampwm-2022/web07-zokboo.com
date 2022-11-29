import axios from 'axios';
import SERVER_URL from '../utils/constants';

const SSORequest = {
  kakao: async () => {
    const { data } = await axios.get(`https://zokboo.shop/auth/kakao`);
    console.log(data);
  },
};

export default SSORequest;
