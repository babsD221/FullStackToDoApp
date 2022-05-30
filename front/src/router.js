import { createRouter, createWebHistory } from 'vue-router'
import UserAuth from './components/UserAuth'
import ToDos  from './components/ToDos'

const router = createRouter({
    history: createWebHistory() ,
    routes: [
        {path:'/',component: UserAuth},
        {path:'/tasks',component:ToDos}
    ]

});
export default router;