import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../config';

export default axios.create({
  baseURL: config.baseURL_API,
  headers: {
    'Authorization': `Bearer ${Cookies.get('token')}`
  }
});
