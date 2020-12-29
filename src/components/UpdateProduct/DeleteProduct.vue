<template>
  <v-row justify="center">
    <v-dialog  v-model="DeleteDialog"  persistent max-width="420px">
      <template v-slot:activator="{ on }">
         <v-btn fab  x-small  v-on="on" color="error" class="mx-1">
             <v-icon  color="white"> mdi-delete-circle-outline</v-icon>
         </v-btn>
      </template>
      <v-card>
        <v-form @submit.prevent="onDeleteProduct">
        <v-card-title>
            <v-btn large fab color="red">  <v-icon large color="white"> mdi-delete-circle-outline</v-icon></v-btn>
        </v-card-title>
         <v-layout row wrap justify-center>
           <v-flex sm10 xs10 md10 lg10>
               <span class="red--text">Are you sure ? Agfer delete you lost it. </span>
            </v-flex>                    
         </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1"  x-small class="text--green" text @click="DeleteDialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" x-small class="text--error" type="submit" text >Confarm</v-btn>
        </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import * as firebase  from 'firebase/app'
import 'firebase/firestore'
  export default {
         props:['id'],
      data(){
          return{
              DeleteDialog:false,
              pId:this.id
          }
      },
     methods:{
       onDeleteProduct () {
          
              this.DeleteDialog = false
            var db = firebase.firestore();
             db.collection("Products").doc(this.pId).delete().then(()=>{
               console.log("oka")
               alert("Delete")
             })
                 
         },
    }
   }
</script>
