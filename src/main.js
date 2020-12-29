import Vue from 'vue'
import App from './App.vue'
import * as firebase  from 'firebase/app'
import 'firebase/firestore'
import router from './router'
import vuetify from './plugins/vuetify';
import AlertCmp from './components/shared/Alert.vue';
import DatetimePicker from 'vuetify-datetime-picker'
import NewAdmin from './components/User/NewAdmin.vue'
import Signin  from './components/User/Signin.vue'
import PriceUpdate from './components/UpdateProduct/PriceUpdate.vue'
import UnitUpdate from './components/UpdateProduct/UnitUpdate.vue'
import StockUpdate from './components/UpdateProduct/StockUpdate.vue'
import ProductUpdate from './components/UpdateProduct/ProductUpdate.vue'
import DeleteProduct from './components/UpdateProduct/DeleteProduct.vue'




Vue.config.productionTip = false

Vue.component ('app-alert', AlertCmp)
Vue.component ('new-admin', NewAdmin)
Vue.component ('signin', Signin)

Vue.component ('unit-update', UnitUpdate)
Vue.component ('price-update', PriceUpdate)
Vue.component ('stock-update', StockUpdate)
Vue.component ('product-update', ProductUpdate)
Vue.component ('delete-product', DeleteProduct)



Vue.use(DatetimePicker)

import { store } from './store'

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    firebase.initializeApp({
   
    })
    firebase.auth().onAuthStateChanged((user)=>{
      if(user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  }
}).$mount('#app')
