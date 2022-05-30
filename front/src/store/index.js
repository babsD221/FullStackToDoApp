import { createStore} from 'vuex';
import axios from 'axios';
import TaskModule from './modules/tasks.js'
import UserAuth from './modules/auth.js'


const store = createStore({
  modules: {
      tasksList:TaskModule,
      authentication: UserAuth
  },
  actions: {
    getTasks(context) {
      const backPath = "http://127.0.0.1:5050/";
      const headers = {
          Authorization: `Bearer: ${this.getters[['authentication/token']]}`,
          "Content-Type":"application/json",
          "User_Id":this.getters['authentication/userId']
          
      }
      axios.get(backPath,{
          headers:headers
      })
      .then(res => {
        context.commit('tasksList/setTasks',res.data);
      })
      .catch((err) => {
          console.error(err)
      })
  },
  getCompletedTasks(context) {
    const path = "http://127.0.0.1:5050/completed_tasks";
    const headers = {
        Authorization: `Bearer: ${this.getters[['authentication/token']]}`,
        "Content-Type":"application/json",
        "User_Id":this.getters['authentication/userId']
        
    }
    axios.get(path,{
        headers:headers
    })
    .then(res => {
      context.commit('tasksList/setCompletedTasks',res.data);
      console.log(res.data);
    })
    .catch((err) => {
        console.error(err)
    })
},
  }
});

export default store;