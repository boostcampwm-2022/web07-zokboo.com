import axios from 'axios';

const customAxios = axios;

customAxios.defaults.withCredentials = true;

export default customAxios;
