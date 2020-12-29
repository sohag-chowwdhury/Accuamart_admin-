<template>
  <v-app>
    <nav >
       
    <v-toolbar dark flat class="black">
         <v-app-bar-nav-icon @click.native.stop="drawer = true"></v-app-bar-nav-icon>
         <v-toolbar-title >
            <router-link to="/" tag="span" style="cursor: pointer">Grocery shop </router-link>
          </v-toolbar-title>
         <v-spacer></v-spacer>
           <v-toolbar-items >
           
               <template v-if="userAuth">
                  <v-btn
                    class="ml-2"
                    min-width="0"
                    text
                  >
                    <v-badge
                      color="red"
                      overlap
                      bordered
                    >
                      <template v-slot:badge>
                        <span>5</span>
                      </template>

                      <v-icon>mdi-bell</v-icon>
                    </v-badge>
                  </v-btn>
                </template>
                <template v-if="userAuth" class="mt-3">
                  <p class="White--text mt-5" style="font-size:.9em;">{{admin.name}}</p>
                  <v-btn
                  class="ml-2"
                  min-width="0"
                  text
                  to="/pages/user"
                >
                <v-avatar class="green" size="35">
                  <v-img :src="admin.profileImageUrl"></v-img>
                </v-avatar>
                </v-btn>
                </template>
                 <v-list-item v-if="userAuth">
                    <v-btn text  small @click="logOut">Logout
                   </v-btn>
                 </v-list-item>
          </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer" app temporary  dark class="black"
    >
      <v-list>
        <v-list-item-group >
          <v-list-item class="mt-10" v-if="userAuth">
            <v-avatar color="white" size="30" class="mr-3">
              <v-img :src="admin.profileImageUrl"></v-img>
              </v-avatar> <p class="mt-4 orange--text" style="font-size:.9em;">{{admin.name}}</p>
          </v-list-item>
          <v-divider></v-divider>
          <v-flex v-if="userAuth">
          <v-list-item  v-for="item in navItems" 
          :key="item.title" 
          router
          :to="item.link">
              <v-icon left>{{item.icon}}</v-icon>
              <v-btn text small>{{item.title}}</v-btn>
          </v-list-item>
          </v-flex>
          <v-list-item  v-if="userAuth">
            <new-admin></new-admin>
          </v-list-item>
           <v-list-item v-if="userAuth">
              <v-icon left>mdi-logout</v-icon>
            <v-btn text  small @click="logOut">Logout
          </v-btn>
           </v-list-item>
          <v-list-item v-if="!userAuth">
             <signin></signin>
          </v-list-item>
        </v-list-item-group>
        

      </v-list>
    </v-navigation-drawer>  
  </nav>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>
<script>
import * as firebase  from 'firebase/app'
import 'firebase/firestore'
   export default {
    data: () => ({
      drawer: false,
      navItems : [
          {icon: 'mdi-cloud-upload-outline', title:'Upload Product', link: "/product/new"},
          {icon: 'mdi-bitbucket', title:'Products', link: "/"},
          {icon: 'mdi-cart-outline', title:'Orders', link: "/orders"},
           {icon: 'mdi-file-image', title:'Slider', link: "/slider"},
          {icon: 'mdi-account-group-outline', title:'Admins', link: "/admins"},

        ],
        admin:{}
    }),
    computed: {
       userAuth () {
         return this.$store.getters.user  !== null &&  this.$store.getters.user !== undefined
       }
    },
      created(){
             firebase.firestore().collection('Admins').get().then((querySnapshot)=>{
                 querySnapshot.forEach((doc)=>{
                     this.admin = doc.data()
                 })
             })

        
     },
    methods: {
      logOut(){
        this.$store.dispatch('logOut')
        this.$router.push('/')

      }
    }
  }
</script>
<style>

</style>