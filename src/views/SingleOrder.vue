<template>
         <v-layout row wrap justify-center>
             <v-flex xs12 sm7 md7 lg7 text-center class="ml-9">
                 <v-layout row warp justify-center>
                     <v-flex xs12 md12 lg12 sm12>
                         <v-btn x-small color="black" class="red--text">
                             Customer Information
                         </v-btn>
                     </v-flex>
                     <v-flex  xs12 md12 lg12 sm12>
                        <v-card>
                            <v-layout row wrap justify-center>
                                <v-flex xs12 3 md3 lg3 class="mt-2">
                                    <p style="font-size:.9em;">Order ID : {{order.orderId}}</p>
                                    <p style="font-size:.9em;" class="green--text">Order Status: {{order.orderStatus}}</p>
                                     <p style="font-size:.9em;" class="error--text">Payment Method: {{order.paymentMethod}}</p>
                                     <p v-if="!order.cancelledBy == 0" style="font-size:.9em;">Order Canceld: {{order.cancelledBy}}</p>
                                     <p v-if="!order.refundStatus == 0" style="font-size:.9em;">Refund Status: {{order.refundStatus}}</p>
                                     <p v-if="!order.refundTransactionId == 0" style="font-size:.9em;">Refund Transaction Id: {{order.refundTransactionId}}</p>
                                     <p v-if="!order.transactionId == 0" style="font-size:.9em;">Transaction Id: {{order.transactionId}}</p>

                                </v-flex>
                                <v-flex xs12 sm5 md5 lg5 class="mt-2">
                                    <p style="font-size:.9em;"> Name: {{order.custDetails.name}}</p>
                                    <p style="font-size:.9em;" class="green--text"> Email:{{order.custDetails.email}}</p>
                                    <p style="font-size:.9em;" class="error--text"> Mobile No:{{order.custDetails.mobileNo}}</p>
                                </v-flex>
                                 <v-flex xs12 sm4 md5 lg4 class="mt-2">
                                    <v-avatar v-if="!order.custDetails.profileImageUrl == ''" size="55" color="info"><v-img :src="order.custDetails.profileImageUrl"></v-img></v-avatar>
                                    <p style="font-size:.9em;" class="black--text"> Address :{{order.custDetails.address}}</p>
                                </v-flex>
                            </v-layout>
                        </v-card>

                     </v-flex>
                 </v-layout>
             </v-flex>
               <v-flex xs12 sm4 md4 lg4>
                   <v-layout justify-center row wrap>
                       <v-form @submit.prevent="onUpdateOrder">
                        <v-flex xs12 sm9 md9 lg9 class="mt-8">
                            <v-btn x-small color="orange">Selce order Status</v-btn>
                        </v-flex>
                       <v-flex xs12 sm9 md9 lg9>
                                 <v-select
                                    v-model="statusOrder"
                                    :items="orderReport"
                                    label="Select Order status*"
                                     dense
                                ></v-select>
                                <v-btn class="green" type="submit" x-small>Submit</v-btn>
                          </v-flex>
                          </v-form>
                   </v-layout>
             </v-flex>
       
             <v-flex>
             </v-flex>
                     <v-flex xs12 sm11 md11 lg11 >
                         
                 <v-layout row wrap justify-center class="black white--text my-4">
                     <v-flex sm12 xs12 md12 lg12 text-center class="mt-2 my-1" >
                         <v-btn class="orange " x-small> Product List</v-btn>
                     </v-flex>
                    <v-flex class="mx-7" mx1 sm1 md1 lg1 >
                        No:
                    </v-flex>
                      <v-flex  mx5 sm3 md3 lg3>
                        Category & ID              
                    </v-flex>
                      <v-flex mx6 sm2 md2 lg2>                    
                        Name
                    </v-flex>
                      <v-flex  mx6 sm1 md1 lg1>
                         Picture
                    </v-flex>
                      <v-flex  mx6 sm2 md2 lg2>
                        Price
                      
                    </v-flex>
                       <v-flex mx6 sm2 md2 lg2>                 
                        Quantity
                    </v-flex>
                      <v-flex >

                    </v-flex>
                </v-layout>
                <v-layout row wrap justify-center v-for="(item,index) in items" :key="index">
                    <v-flex class="mx-7" mx1 sm1 md1 lg1 >
                        {{index+1}} 
                    </v-flex>
                      <v-flex  mx5 sm3 md3 lg3>
                        <p style="font-size:.9em">{{item.id}}</p>
                        <p style="font-size:.9em">{{item.category}}</p>
                       
                    </v-flex>
                      <v-flex mx6 sm2 md2 lg2>                    
                        <p style="font-size:.9em">{{item.subCategory}}</p>
                        <p style="font-size:.9em">{{item.name}}</p>
                    </v-flex>
                      <v-flex  mx6 sm1 md1 lg1>
                          <v-img width="49" :src="item.productImage"> </v-img>
                    </v-flex>
                      <v-flex  mx6 sm2 md2 lg2>
                         <p style="font-size:.9em" class="black--text"> Og Price: {{item.ogPrice}}</p>
                        <p style="font-size:.9em" class="error--text"> Dis Price: {{item.price}}</p>
                        <p style="font-size:.9em" class="green--text">Total: {{item.totalAmt}}</p>
                      
                    </v-flex>
                       <v-flex mx6 sm2 md2 lg2 style="font-size:.9em">                 
                        <p style="font-size:.9em">Unit: {{item.quantity}}</p>
                        <p style="font-size:.9em">unit Qu: {{item.unitQuantity}}</p>
                        Reset:<v-btn x-small><unit-update></unit-update></v-btn>
                    </v-flex>
                      <v-flex >

                    </v-flex>
                </v-layout>
                <v-layout>
                      <v-flex  xs12 md12 lg12 sm12>
                          <v-layout row wrap justify-center class="grey darken-3 ">
                              <v-flex xs12 md12 lg12 sm12 class="my-3" text-center>
                                  <v-btn class="indigo white--text" x-small> Delivery Details</v-btn>
                              </v-flex>
                          </v-layout>
                        <v-card>
                            <v-layout row wrap justify-center>
                                <v-flex xs12 3 md3 lg3 class="mt-2">
                                    <p style="font-size:.9em;">Delivery Status : <v-btn small color="orange">{{order.deliveryDetails.deliveryStatus}}</v-btn></p>
                                </v-flex>
                               <v-flex xs12 3 md3 lg3 class="mt-2">
                                <p style="font-size:.9em;" class="green--text">Name: {{order.deliveryDetails.name}}</p>
                               </v-flex>
                               <v-flex xs12 3 md3 lg3 class="mt-2">
                                     <p style="font-size:.9em;" class="error--text">Mobile No: {{order.deliveryDetails.mobileNo}}</p>
                               </v-flex>
                            </v-layout>
                        </v-card>

                     </v-flex>
                </v-layout>
             </v-flex>
         </v-layout>

         
    

</template>
<script>
import * as firebase  from 'firebase/app'
import 'firebase/firestore'
export default {
   
    data() {
        return {
            order:{},
            items:{},
            ID:'',
            statusOrder:'',
            orderReport:['Delivered', 'Order Canceled', 'Out for delivery']

        }
    },
     created(){
             firebase.firestore().collection('Orders').get(this.id).then((querySnapshot)=>{
                 querySnapshot.forEach((doc)=>{
                     this.order=doc.data()
                     this.items=(doc.data().products)
                       this.ID = doc.data().orderId
                       console.log( this.ID)
                 })
             })

               
    },
    methods:{
          onUpdateOrder () {
           
            var db = firebase.firestore();
             db.collection("Orders").doc(this.ID).update({       
                 orderStatus:this.statusOrder
              }).then(function() {
                    alert("Product Update Success")
                    });
           
            
         },
    }
   
}
</script>