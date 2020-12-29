import Vue from 'vue'
import VueRouter from 'vue-router'
import Signin from '../components/User/Signin'
import UploadProduct from '../views/UploadProduct'
import SingleOrder from '../views/SingleOrder'
import Products from '../views/Products'
import AdminInfo from '../views/AdminInfo'
import Slider from '../views/Slider'
import Admins from '../views/Admins'
import Orders from '../views/Orders'

Vue.use(VueRouter)

const routes = [

  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  
  
  {
    path: '/product/new',
    name: 'UploadProduct',
    component: UploadProduct
  },
  
  {
    path: '/',
    name: 'Products',
    component: Products
  },
  {
    path: '/orders',
    name: 'Orders',
    props:true,
    component: Orders
    
  },
  {
    path: '/slider',
    name: 'Slider',
    component: Slider
  },
  {
    path: '/order/:id',
    name: 'SingleOrder',
    component: SingleOrder,
    props:true
  },
  {
    path: '/admins',
    name: 'Admins',
    component: Admins
  },
  {
    path: '/admin/info',
    name: 'AdminInfo',
    component: AdminInfo
  },
  
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
