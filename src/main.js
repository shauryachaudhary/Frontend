import { createApp } from 'vue';
import App from './App.vue';
import router from './routers';
import store from './store';
import axios from 'axios';

axios.defaults.baseURL="http://localhost:5000";   //PLZZ CHANGE THE ADRESS IN  ChatBox component as well


const app = createApp(App);
app.config.globalProperties.$axios = axios;
    app.use(router);
    app.use(store);
    app.mount('#app');







// json-server --watch db.json