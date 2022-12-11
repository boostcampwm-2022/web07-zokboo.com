import axios from 'axios';

const client = axios;

client.defaults.withCredentials = true;

export default client;
