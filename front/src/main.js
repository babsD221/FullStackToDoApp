import '@/assets/css/tailwind.css'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
