<template>
  <v-row justify="center">
    <v-dialog  v-model="DeleteDialog"  persistent max-width="220px">
      <template v-slot:activator="{ on }">
         <v-btn text  x-small  v-on="on" color="orange" class="mx-1">
             unit
         </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class=" black--text">Update Stock</span>
        </v-card-title>
        <v-form @submit.prevent="onUpdateProduct">
         <v-layout row wrap justify-center>
            <v-flex xs12 sm8 md8 lg8 class="mx-2 mt-4">
                  <v-text-field
                    v-model="unit"
                    label="Unit*"
                ></v-text-field>
                <v-btn x-small class="mx-1"  @click="upDown" color="error">down</v-btn>
                <v-btn x-small color="green"   @click="upUnit">up</v-btn>   
               
            </v-flex>                      
         </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1"  x-small class="text--green" text @click="DeleteDialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" type="submit" x-small class="text--error" text>update</v-btn>
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
             unit:this.item,
             pId:this.id,
            DeleteDialog: false,
            status: ['Up Comeing', 'In Stock', 'Stock Out'],
  }
       },
        methods: {
           onUpdateProduct () {
              this.DeleteDialog = false
              console.log(this.unit)
            var db = firebase.firestore();
             db.collection("Products").doc(this.pId).update({       
             quantity:this.unit,
        
              }).then(function() {
                    alert("Product Update Success")
                    });
           
            
         },
           upUnit(){
                var value = parseInt(this.unit) 
               this.unit = value+1
           },
           upDown(){
                var value = parseInt(this.unit) 
               this.unit = value -1
           }
    }
   }
</script>
