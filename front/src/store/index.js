import { createStore} from 'vuex';
import TaskModule from './modules/tasks.js'
import UserAuth from './modules/auth.js'
import { authService } from './../api';

import router from '../router.js'

const store = createStore({
  modules: {
      tasksList:TaskModule,
      authentication: UserAuth
  },
  actions: {
    getTasks(context) {
      const backPath = "/";
      const headers = {
          Authorization: `Bearer: ${localStorage.getItem('token')}`,
          "Content-Type":"application/json",
          "User_Id":localStorage.getItem('userId')
          
      }
      authService.get(backPath,{
          headers:headers
      })
      .then(res => {
        context.commit('tasksList/setTasks',res.data);
      })
      .catch((err) => {
          console.error(err)
      })
    },  
  logout(context) {
    context.dispatch('authentication/logout');
    context.commit('tasksList/removeAllTasks');
    router.push('/');
  }
  }
});

export default store;