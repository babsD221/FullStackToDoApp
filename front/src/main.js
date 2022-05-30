import '@/assets/css/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import BaseCard from './components/BaseCard'
import BaseButton from './components/BaseButton'

/* import { createStore} from 'vuex';
 */import store from './store/index'
import DeleteIcon from 'vue-material-design-icons/Delete.vue';
import DoneIcon from 'vue-material-design-icons/CheckOutline.vue';

import router from './router.js'

const app = createApp(App)
app.component('base-card', BaseCard)
app.component('base-button',BaseButton)

app.use(store)
app.component('delete-icon', DeleteIcon);
app.component('done-icon', DoneIcon);

app.use(router);
app.mount('#app');