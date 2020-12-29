<template>
    <v-container>
        <v-layout row wrap justify-center>
            <v-flex xs11 sm11 md11 lg11>
            <v-card class="my-7">
                <v-layout row wrap justify-center>
                    <v-flex  xs6 md3 sm3 lg3 >
                        Admin Picture
                    </v-flex >
                    <v-flex  xs6 md3 sm3 lg3>
                        Admin Name
                    </v-flex>
                    <v-flex  xs6 md3 sm3 lg3>
                        Admin status
                    </v-flex>
                      <v-flex  xs6 md3 sm3 lg3>
                        Update
                    </v-flex>
                </v-layout>
            </v-card>
            <v-card  class="my-1 grey darken-1" v-for="(admin,index) in admins" :key="admin.index">
                <v-layout row wrap justify-center>
                    <v-flex xs2 md1 sm1 lg1>
                            {{index+1}}
                    </v-flex>
                    <v-flex xs6 md3 sm3 lg3>
                       <v-avatar
                          color="primary"
                         size="56"
                         class="mx-4"
                        >
                        <img
                         :src="admin.profileImageUrl"
                        alt="John"
                         >
                        </v-avatar>
                    </v-flex>
                    <v-flex  xs6 md3 sm3 lg3 class="mt-3">
                        {{admin.name}} <br>
                        <p>Contact No: {{admin.mobileNo}}</p>
                    </v-flex>
                    <v-flex  xs6 md2 sm2 lg2 class="mt-3">
                        
                    </v-flex>
                      <v-flex xs6 md3 sm3 lg3 class="mt-3">
                        <v-btn color="error" x-small class="mx-2">Details</v-btn>
                    </v-flex>
                </v-layout>
            </v-card>
         </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import * as firebase  from 'firebase/app'
import 'firebase/firestore'
  export default {
    data: () => ({
       admins:[]    
    }),
    created(){
             firebase.firestore().collection('Admins').get().then((querySnapshot)=>{
                 querySnapshot.forEach((doc)=>{
                     console.log(doc.data())
                     this.admins.push(doc.data())
                 })
             })

               
    },
    methods:{
      
    }
  }
</script>