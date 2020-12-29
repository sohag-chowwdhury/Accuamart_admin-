<template>
 <v-container>
   <v-layout row wrap justify-center>
     <v-flex xs12 md12 lg12 sm12 text-center>
          <v-btn x-small color="black" class="white--text">Order  List</v-btn>
     </v-flex>
     <v-flex  xs12 md12 lg12 sm12>
       <v-card class="grey lighten-2 rounded-lg">
       <v-layout row wrap justify-center v-for="(item,index) in orders" :key="item.index">
          <v-flex xs4 sm1 md1 lg1 class="mt-3">
            {{index+1}}
         </v-flex>
         <v-flex xs4 sm2 md2 lg2 class="mt-3" >
            {{item.orderId}}
         </v-flex>
          <v-flex xs4 sm3 md3 lg3>
            {{item.custDetails.name}} <br>
              {{item.custDetails.mobileNo}}
              <br> 
              {{item.custDetails.email}}
         </v-flex>
          <v-flex xs4 sm2 md2 lg2>
            {{item.charges.totalAmt}} <br>
              {{item.charges.discountAmt }}      
         </v-flex>
          <v-flex xs4 sm2 md2 lg2 class="mt-3">
            {{item.orderStatus}} <br>
                  
         </v-flex>
         <v-flex class="mt-3">
           <v-btn x-small color="green"  @click="lodeOrder(item.orderId)" >
             Details
           </v-btn>
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
  data(){
      return {
        orders:[]
      }
  },
   created(){
             firebase.firestore().collection('Orders').get().then((querySnapshot)=>{
                 querySnapshot.forEach((doc)=>{
                     this.orders.push(doc.data())
                 })
             })

               
    },
    methods:{
         lodeOrder (id) {
       
        this.$router.push('/order/' +id)      
            
    }
    }
}
</script>
