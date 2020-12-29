<template>
  <v-row justify="center">
    <v-dialog  v-model="DeleteDialog"  persistent max-width="220px">
      <template v-slot:activator="{ on }">
         <v-btn text  x-small  v-on="on" color="green" class="mx-1">
             Stock
         </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class=" black--text">Update Stock</span>
        </v-card-title>
        <v-form  @submit.prevent="onUpdateProduct" >
         <v-layout row wrap justify-center>
            <v-flex xs12 sm8 md8 lg8 class="mx-2 mt-4">
                 <v-select
                   @change="statusAdd"
                    :items="status"
                    label="Product Status*"
                     v-model="statusValue"
                       dense
                   ></v-select>
                </v-flex>
                             
            </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1"  x-small class="text--green" text @click="DeleteDialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" type="submit" x-small class="text--error" text >Confarm</v-btn>
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
            props:['item', 'id'],
            
   data () {
       return{
            DeleteDialog: false,
            pId:this.id,
             statusValue:this.item,
            status: [ 'In Stock', 'Stock Out'],
  }
       },
        methods: {
           statusAdd(){
                if(this.statusValue == "In Stock")
                    {
                        this.statusValue = true
                    }
                    else{
                         this.statusValue = false
                    }
            },
              onUpdateProduct () {
           
              this.DeleteDialog = false
            var db = firebase.firestore();
             db.collection("Products").doc(this.pId).update({       
             inStock:this.statusValue,
          
        
              }).then(function() {
                    alert("Product Update Success")
                    });
           
            
         },
    }
   }
</script>
