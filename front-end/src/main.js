import { createApp } from 'vue';
import VueAxios from 'vue-axios';
import SideBar from '@/components/SideBar.vue';
import Loader from '@/components/Loader.vue';
import Header from '@/components/Header.vue';
import CustomSelect from '@/components/CustomSelect.vue';
import moment from 'moment';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from './plugins/axios';

moment.locale('pt-br');

const app = createApp(App);

app.use(router);
app.use(store);
app.use(VueAxios, axios);

app.component('SideBar', SideBar);
app.component('AppLoader', Loader);
app.component('AppHeader', Header);
app.component('CustomSelect', CustomSelect);

app.config.productionTip = false;

app.mount('#app');
