import '@/assets/css/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import BaseCard from './components/BaseCard'
import BaseButton from './components/BaseButton'

/* import { createStore} from 'vuex';
 */import store from './store/index'
import DeleteIcon from 'vue-material-design-icons/Delete.vue';
import DoneIcon from 'vue-material-design-icons/CheckOutline.vue';

import { createRouter, createWebHistory } from 'vue-router'

import UserAuth from './components/UserAuth'
import ToDos  from './components/ToDos'

/* const store = createStore({
    state() {
        return {
            tasks: []
        }
    }
}); */
const app = createApp(App)
app.component('base-card', BaseCard)
app.component('base-button',BaseButton)

app.use(store)
app.component('delete-icon', DeleteIcon);
app.component('done-icon', DoneIcon);

const router = createRouter({
    history: createWebHistory() ,
    routes: [
        {path:'/',component: UserAuth},
        {path:'/tasks',component:ToDos}
    ]

})

app.use(router);
app.mount('#app');