import axios from 'axios';
import store from './store/index'
const header = {
  'Content-type':'application/json',
  'Accept': 'application/json'
}
const authService = axios.create({
  baseURL: "http://127.0.0.1:5050",
  headers:header,
});

authService.interceptors.response.use((response) => {
  return response
}, async (error) => {
  switch (error.response.status) {
    case 401:{
      alert('Your session expired. Login again');
      store.dispatch('logout');
      }
      break;
    case 404:
      break;
    default:
      break;
  }
  return error.response;
});

export {authService};