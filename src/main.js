import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/style.scss'
import './assets/vendor/fontawesome-5.6.1/css/all.min.css'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import VueFinalModal from 'vue-final-modal'
import axios from 'axios'
import VueAxios from 'vue-axios'
import  maska  from 'maska'
import VueTelInput from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import VueGtag from "vue-gtag-next";
import VueTheMask from 'vue-the-mask';
createApp(App).use(maska).use(VueTheMask).use(PrimeVue).use(VueLodash).use(store).use(router).use(VueAxios, axios).use(ElementPlus).use(VueFinalModal(), { componentName: 'VueFinalModal', key: '$vfm', dynamicContainerName: 'ModalsContainer'}).use(VueGtag, { property: { id: "G-E6ELE0N03N"}}).mount('#app')




