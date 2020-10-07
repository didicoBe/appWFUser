import axios from 'axios';

const apiWF = axios.create({
    baseURL: 'https://wfdesenvolvimento.com.br/api/',
    headers: {
        'Authorization': 'jW|SZmY52Exj6HJ',
    }   
});

export default apiWF;