import { createStore} from 'vuex';

import TaskModule from './modules/tasks.js'
import UserAuth from './modules/auth.js'


const store = createStore({
  modules: {
      tasksList:TaskModule,
      auth: UserAuth
  }
});

export default store;