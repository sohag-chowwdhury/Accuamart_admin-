<template> 
    <v-container>
        <v-layout row wrap justify-center>
           
            <v-flex xs11 md11 sm11 lg11 text-center>
                <v-btn  small outlined black class="my-2">Products</v-btn>
            </v-flex>
            <v-flex xs11 md10 sm10 lg10 text-center>
                <v-flex>               
                    <v-layout row wrap justify-center  style=" border-bottom: outset; border-width:1px; border-color:black">
                    <v-flex xs4 md2 lg2 sm2 class="mt-5">
                        <v-icon class="mx-2">mdi-sort-variant</v-icon>Filter by:
                    </v-flex> 
                   
                    
                     <v-flex xs12 sm3 md3 lg3 class="mx-2 mt-4">
                                 <v-select
                                    @change="subCategoryAdd"
                                    :items="categoriesItem"
                                     item-text="categoryName"
                                    v-model="category"
                                    label="Category*"
                                     dense
                                ></v-select>
                    </v-flex>
                      <v-flex v-if="!this.subCategoryValue.length == 0" xs5 sm3 md3 lg3 class="mx-2 mt-4">
                                <v-select
                                     @change="subFilter"
                                    :items="subCategoryValue"
                                    item-text="subCategoryName"
                                    v-model="subCategory"
                                    label="Sub Category*"
                                     dense
                                ></v-select>
                    </v-flex>
                    <v-flex  xs4 md3 lg3 sm3> 
                        <v-text-field
                         
                            label="Product ID"
                            color="secondary"
                            hide-details
                            style="max-width: 165px;"
                        >
                            <template
                            v-if="$vuetify.breakpoint.mdAndUp"
                            v-slot:append-outer
                            >
                            <v-btn
                                class="mt-n2"
                                elevation="1"
                                fab
                                small
                            >
                                <v-icon>mdi-magnify</v-icon>
                            </v-btn>
                            </template>
                         </v-text-field>
                         </v-flex>
                    </v-layout>
                </v-flex>
            </v-flex>
            <br>
            <br>
            <v-flex xs11 sm10 md10 lg10 class="mt-7">
                 <v-card>
                    <v-layout row wrap justify-center>
                       <v-flex xs1 sm1 md1 lg1 text-start>
                           No:
                       </v-flex>
                        <v-flex xs5 sm3 md3 lg3 text-start>
                           Product Name
                          
                       </v-flex>
                        <v-flex xs5 sm2 md2 lg2 text-start>
                            Photo
                       </v-flex>
                        <v-flex xs3 sm2 md2 lg2 text-start>
                           Category & status
                       </v-flex>
                         <v-flex xs3 sm2 md2 lg2 text-start>
                           Price
                       </v-flex>
                        <v-flex xs3 sm2 md2 lg2 text-start>
                           Update
                       </v-flex>
                       

                   </v-layout>
                 </v-card>
            </v-flex>
             <v-flex xs11 sm10 md10 lg10 class="mt-1" v-for="(item,index) in products" :key="item.index">
                 <v-card>
                   
                    <v-layout row wrap justify-center>
                       <v-flex xs1 sm1 md1 lg1 text-start>
                          {{index+1}}
                       </v-flex>
                        <v-flex xs5 sm2 md2 lg2 text-start>
                           {{item.name}}
                            <br>
                           <p class="green--text">{{item.id}}</p> 
                       </v-flex>
                            <v-flex xs5 sm3 md2 lg2 text-start>
                              <v-img width="55" :src="item.productImages[0]"></v-img>
                            </v-flex>
                       
                        <v-flex xs6 sm2 md2 lg2 text-start>
                           <v-layout row wrap justify-center>
                               <v-flex xs12 md12 lg12 sm12 >
                                    <v-btn x-small depressed  class="green--text">{{item.category}}</v-btn>
                               </v-flex>
                               <v-flex xs12 md12 lg12 sm12 >
                                    <v-btn x-small depressed class="green--text"><stock-update  :id="item.id"  :item="item.inStock" class="mr-1"></stock-update> 
                                        <p v-if="item.inStock" class="mt-3" >:In Stock</p>
                                        <p v-if="!item.inStock" class="red--text mt-3">:Stock Out</p>
                                    </v-btn>
                               </v-flex>
                               <v-flex xs12 md12 lg12 sm12 >
                                  
                                    <v-btn x-small depressed class="orange--text"><unit-update class="mr-1" :id="item.id"  :item="item.quantity"></unit-update>{{item.quantity}}</v-btn>
                               </v-flex>
                           </v-layout>
                       </v-flex>
                         <v-flex xs6 sm2 md3 lg3 text-start>
                             
                            <v-flex xs6 md12 lg12 sm12 >
                                    <v-btn x-small depressed color="white"> <price-update  :id="item.id"  :item="item.ogPrice"></price-update>{{item.ogPrice}} peso</v-btn>
                               </v-flex>
                                <v-flex xs12 md12 lg12 sm12 >
                                    <v-btn x-small depressed  class="error--text">Descount Price:{{item.price}} peso</v-btn>
                               </v-flex>
                       </v-flex>
                        <v-flex xs6 sm2 md2 lg2 text-start>
                            <v-btn fab x-small> <product-update :item="item" :id="item.id" ></product-update></v-btn>                           
                           <v-btn fab x-small color="error" class="mx-1 mt-3"><delete-product :id="item.id"></delete-product></v-btn>
                       </v-flex>
                   </v-layout>
                 </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import PriceUpdate from '../components/UpdateProduct/PriceUpdate.vue'
import ProductUpdate from '../components/UpdateProduct/ProductUpdate.vue'
import StockUpdate from '../components/UpdateProduct/StockUpdate.vue'
import UnitUpdate from '../components/UpdateProduct/UnitUpdate.vue'
import * as firebase  from 'firebase/app'
import 'firebase/firestore'
  export default {
  components: { PriceUpdate, StockUpdate, UnitUpdate, ProductUpdate },
    data: () => ({
        categoryValue:'',
        categoriesItem:[],
        subCategories:[],
         subCategoryValue:[],  
         subCategory:'',
       products:[],
        category:'',
        addCategory:false,
        date:'',
        subCategorieValue:{
                 subCategoryName:''
             },
    }),
    created(){
             firebase.firestore().collection('Products').get().then((querySnapshot)=>{
                 querySnapshot.forEach((doc)=>{
                     this.products.push(doc.data())
                 })
             }),
               firebase.firestore().collection('Categories').get().then((querySnapshot)=>{
                 querySnapshot.forEach((doc)=>{
                     this.categoriesItem.push(doc.data())
                 })
             })
             

               
    },
    methods:{
        subFilter(){
             firebase.firestore().collection("Products").where("reviews.subCategory", "==", this.subCategory)
                    .get()
                    .then((querySnapshot)=>{
                    querySnapshot.forEach((foc)=> {
                        console.log(foc.data())
                        this.products.length = 0
                        this.products.push(foc.data())
                        console.log( this.products)
                        
                        });
                 })
                .catch((error)=> {
                 console.log("Error getting documents: ", error);
                });
        },
        subCategoryAdd(){
             firebase.firestore().collection("Products").where("category", "==", this.category)
                    .get()
                    .then((querySnapshot)=>{
                    querySnapshot.forEach((foc)=> {
                        console.log(foc.data())
                        this.products.length = 0
                        this.products.push(foc.data())
                        console.log( this.products)
                        
                        });
                 })
                .catch((error)=> {
                 console.log("Error getting documents: ", error);
                });
                 for ( let i = 0; i < this.categoriesItem.length ; i++) {
                    if(  this.category ==   this.categoriesItem[i].categoryName ){
                        this.subCategoryValue.length = 0
                         this.subCategoryValue = this.categoriesItem[i].subCategories
                    }
                }
            },
      
    }
  }
</script>
