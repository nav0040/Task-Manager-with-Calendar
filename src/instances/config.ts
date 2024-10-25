import axios from 'axios';
const instance = axios.create({
    baseURL:'https://task-manager-backend-6pfk.onrender.com/api/v1',
    withCredentials:true,
});

export default instance;
