<template>
  <v-row justify="center">
    <v-dialog  v-model="DeleteDialog"  persistent max-width="600px">
      <template v-slot:activator="{ on }">
         <v-btn text  x-small  v-on="on" color="green" class="mx-1">
             price
         </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class=" black--text">Update Price</span>
        </v-card-title>
        <v-form @submit.prevent="onUpdateProduct" >
         <v-layout row wrap justify-center>
                           
                             <v-flex xs12 sm4 md4 lg4 class="mx-2">
                                <v-text-field
                                label="Product Price*"
                                v-model="unitPrice"
                            ></v-text-field>
                            </v-flex>
                            <v-flex xs5 md3 lg3 sm3 class="mx-2 mt-4">
                                 <v-select
                                    :items="discount"
                                    label="Discount in %"
                                     v-model="discountPercentage"
                                     dense
                                     @change="discountPrice"
                                ></v-select>
                            </v-flex>
                             <v-flex xs12 sm3 md3 lg3 class="mx-2">
                                <v-text-field
                                v-model="unitDiscountPrice"
                                label="Discount Price*"
                            > </v-text-field>
                            </v-flex>
                             
                        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1"  class="text--green" text @click="DeleteDialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" class="text--error" text type="submit">Confarm</v-btn>
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
              unitPrice:this.item,
             unitDiscountPrice:'',
             discountPercentage:'',
             discount:['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50','55','60', '65', '70', '75']
  }
       },
        methods: {
              discountPrice(){
            const price = this.unitPrice
            let discount =   this.discountPercentage/100
            const discountPrice = price * discount
            this.unitDiscountPrice = (price  - discountPrice)
        },
          onUpdateProduct () {
            console.log(this.unitPrice)
            console.log(this.unitDiscountPrice)
              this.DeleteDialog = false
            var db = firebase.firestore();
             db.collection("Products").doc(this.pId).update({       
             ogPrice:this.unitPrice,
             price:this.unitDiscountPrice
        
              }).then(function() {
                    alert("Product Update Success")
                    });
           
            
         },
     
    }
   }
</script>
