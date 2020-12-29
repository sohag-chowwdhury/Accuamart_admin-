<template>
  <v-row justify="center">
    <v-dialog  v-model="DeleteDialog"  persistent max-width="600px">
      <template v-slot:activator="{ on }">
          <v-btn fab x-small v-on="on" color="blue" class="mx-1 mt-3"><v-icon color="white">mdi-square-edit-outline</v-icon></v-btn>
      </template>
      <v-card>
        <v-form @submit.prevent="onProductUpdate">
          <v-layout row wrap justify-center class="mt-8">
         <v-flex xs4 md3 lg5 sm3 text-center> <v-btn color="black white--text" small>Edit Product</v-btn></v-flex>
         <v-flex xs12 md10 sm10 lg8 text-end>
               <v-layout row wrap justify-center class="my-1" style=" border-top: outset; border-color:grey">
                    <v-flex xs12 sm10 md10 lg10  class="my-2">
                        <v-layout row wrap justify-center class="my-3">
                            <v-flex xs12 sm5 md5 lg5 class="mx-2 mt-4">
                                  <v-select
                                    @change="subCategoryAdd"
                                    :items="categoriesItem"
                                     item-text="categoryName"
                                    v-model="category"
                                    label="Category*"
                                     dense
                                ></v-select>
                            </v-flex>
                           
                             <v-flex xs12 sm5 md5 lg5 class="mx-2 mb-3">
                                <v-text-field
                                label="Quantity*"
                                v-model="quantity"
                            ></v-text-field>
                            </v-flex>
                           
                        </v-layout>
                        <v-layout>
                              <v-flex v-if="this.addCategory" xs5 sm6 md6 lg6 class="mx-2 ">
                                  <v-text-field
                                label="Set Category"
                                 ></v-text-field>
                            </v-flex>
                             <v-flex xs5 sm6 md6 lg6 class="ml-6 ">
                                  <v-text-field
                                label="Unit*"
                                v-model="reviews.unitQuantity"
                                 ></v-text-field>
                            </v-flex>
                             <v-flex v-if="this.categoriesItem.length != 0" xs5 sm6 md6 lg6 class="mx-2 mt-4">
                                <v-select
                                    :items="subCategoryValue"
                                    item-text="subCategoryName"
                                    v-model="reviews.subCategory"
                                    label="Sub Category*"
                                     dense
                                ></v-select>
                            </v-flex>
                        </v-layout>
                         <v-layout row wrap justify-center>
                            <v-flex xs12 sm10 md10 lg10>
                                <v-text-field
                                label="Product Title*"
                                v-model="item.name"
                            ></v-text-field>
                            </v-flex>
                            
                        </v-layout> 
                          <v-layout row wrap justify-start>
                            <v-flex xs12 md10 lg10 sm10 text-start class="ml-7" >
                                <v-btn @click="addititionalButton" x-small color="info"> Additional Info + </v-btn>
                            </v-flex>
                            <v-flex xs12 md12 lg12 sm12 v-if="addititionalButtonInfo">
                                <v-layout row wrap justify-center>
                                    <v-flex xs6 sm4 md4 lg4 class="ml-3">
                                        <v-text-field label="Manufecture Date">
                                            
                                        </v-text-field>
                                    </v-flex>
                                     <v-flex xs6 sm4 md4 lg4 class="ml-1">
                                        <v-text-field v-model="additionalInfo.brand" label="Brand">
                                            
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs6 sm3 md3 lg3 class="ml-1" >
                                         <v-text-field v-model="additionalInfo.bestBefore" label="Best before">                                      
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                        <v-layout row wrap justify-center>

                           
                            <v-flex xs10 sm11 md11 lg11 class="mx-1">
                                <v-text-field
                                  v-model="additionalInfo.other"
                                label="Other Info"
                            ></v-text-field>
                            </v-flex>
                            
                        </v-layout>
                        </v-flex>
                        </v-layout>
                        <v-layout row wrap justify-center>
                            <v-flex xs12 md11 lg11 sm12>
                            <v-textarea
                                color="teal"
                                label="Description"
                                v-model="description"
                                >                              
                                </v-textarea>
                            </v-flex>
                        </v-layout> 
                    </v-flex>
            </v-layout>
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

     props:['item', 'id'],
     data () {
        
         return {
            addititionalButtonInfo:false,
            name:this.item.name,
             DeleteDialog:false,
             categoryValue:'',
             addCategory:false,
             subCategory:[],  
             description:this.item.description,
             date: new Date(),
             categoriesItem:[],
            categoryName:'',
             subCategorieValue:{
                 subCategoryName:''
             },
             subCategories:[],
         
               additionalInfo:{
                bestBefore:this.item.additionalInfo.bestBefore,
                brand:this.item.additionalInfo.brand,
                manufactureDate:this.item.additionalInfo.manufactureDate,
                shelfLife:this.item.additionalInfo.manufactureDate,
                other:this.item.additionalInfo.other
            },

             category:'',
             uPi:this.id,
             quantity:this.item.quantity,

             reviews:{
                 timestamp:new Date(),
                 trending:true,
                 unitQuantity:this.item.reviews.unitQuantity,
                 view:'',

             },

             subCategoryValue:[], 
         }
     },
     created(){
             firebase.firestore().collection('Categories').get().then((querySnapshot)=>{
                 querySnapshot.forEach((doc)=>{
                     this.categoriesItem.push(doc.data())
                 })
             })

        
     },
     computed: {
         formValidation () {
             return this.title !== '' &&
              this.location !== '' &&
             this.imageUrl !== ''
              && this.description !== ''
         },
        
     },
     methods: {
           onProductUpdate () {
           this.DeleteDialog = false
            var db = firebase.firestore();
             db.collection("Products").doc(this.uPi).update({
                   
                    additionalInfo:{
                     bestBefore:this.additionalInfo.bestBefore,
                     brand:this.additionalInfo.brand,
                     manufactureDate:this.additionalInfo.manufactureDate,
                    shelfLife:this.additionalInfo.shelfLife,
                    other:this.additionalInfo.other
                  },

             category:this.category,
             description:this.description,
             id:this.id,
             name:this.name,

             reviews:{
                 subCategory:this.reviews.subCategory,
                 unitQuantity:this.reviews.unitQuantity,

             }
              }).then(function() {
                    alert("Product Uploaded")
                    });
           
            
         },
          subCategoryAdd() {
                for ( let i = 0; i < this.categoriesItem.length ; i++) {
                    console.log(i)
                    if(  this.category ==   this.categoriesItem[i].categoryName ){
                        console.log(this.category)
                        console.log(  this.categoriesItem[i].categoryName)
                        console.log(this.categoriesItem[i].subCategories)
                        this.subCategoryValue.length = 0
                         this.subCategoryValue = this.categoriesItem[i].subCategories
                    }
                }
            
        },
           addititionalButton(){
             this.addititionalButtonInfo = !  this.addititionalButtonInfo
         },
      
        discountPrice(){
            const price = this.unitPrice
            let discount =   this.discountPercentage/100
            const discountPrice = price * discount
            this.unitDiscountPrice = (price  - discountPrice)
        },
        
        
     }
 }
</script>
