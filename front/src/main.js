import '@/assets/css/tailwind.css'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);

import { createApp } from 'vue'
import App from './App.vue'
import BaseCard from './components/BaseCard'
import BaseButton from './components/BaseButton'

import { createStore} from 'vuex';
import DeleteIcon from 'vue-material-design-icons/Delete.vue';
import DoneIcon from 'vue-material-design-icons/CheckOutline.vue';



const store = createStore({
    state() {
        return {
            tasks: []
        }
    }
});
const app = createApp(App)
app.component('base-card', BaseCard)
app.component('base-button',BaseButton)

app.use(store)
app.component('delete-icon', DeleteIcon);
app.component('done-icon', DoneIcon);


app.mount('#app')