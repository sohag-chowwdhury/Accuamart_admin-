<template>
 <v-container>
     <v-layout row wrap justify-center>
         <v-flex xs4 md3 lg5 sm3 text-center> <v-btn color="black white--text" small>Update Product</v-btn></v-flex>
         <v-flex xs12 md10 sm10 lg8 text-end>
              <v-layout row wrap justify-center>
                     <v-flex xs12 sm10 md10 lg10 >
                          <v-flex xs12 md10 lg10 sm10 text-start class="ml-4" >
                                <v-btn @click="addititionalButtonCategoryDelete" v-if="!addititionalInfoButtonDelete" x-small color="error" class="px-3"> Delete Category + </v-btn>
                                <v-btn @click="addititionalButtonCategoryDelete"  v-if="addititionalInfoButtonDelete"  x-small color="green"> minimize section + </v-btn>
                            </v-flex>
                            <v-flex xs12 md12 lg12 sm12  v-for="(item,index) in categoriesItem" :key="item.index">
                                <v-card class="my-1 grey lighten-1" v-if="addititionalInfoButtonDelete">
                                    <v-layout row wrap justify-center >
                                          <v-flex xs1 sm1 md1 lg1 text-center>
                                              {{index+1}}
                                        </v-flex>
                                        <v-flex xs4 sm4 md4 lg4 text-center>
                                                {{item.categoryName}}
                                        </v-flex>
                                        <v-flex xs3 sm3 md3 lg3 text-center>
                                            <v-img width="55" :src="item.imageLink"></v-img>                 
                                        </v-flex >
                                        <v-flex xs3 sm3 md3 lg3 text-center>
                                            <v-btn x-small @click="onDeleteCategorie(item.categoryId)" color="error">Delete</v-btn>
                                        </v-flex>
                                          
                                    </v-layout>
                                </v-card>
                            </v-flex>
                     </v-flex>
                 </v-layout>
             <v-layout row justify-center>
                
                 <v-flex  xs12 sm10 md10 lg10  class="my-2">
                     <v-form  @submit.prevent="onUploadProductCategory">
                       <v-layout row wrap justify-start>
                            <v-flex xs12 md10 lg10 sm10 text-start class="ml-7" >
                                <v-btn @click="addititionalButtonCategory" v-if="!addititionalCategoryButton" x-small color="orange"> Add New Category + </v-btn>
                                <v-btn @click="addititionalButtonCategory"  v-if="addititionalCategoryButton" x-small color="error"> minimize section + </v-btn>
                            </v-flex>

                            <v-flex xs12 md12 lg12 sm12 v-if="addititionalCategoryButton">
                                <v-layout row wrap justify justify-center>
                                    <v-flex xs4 md4 lg4  v-if="!this.categoryName==''">
                                       <p>Category Name</p>
                                       <v-btn color="grey lighten-1" x-small>{{this.categoryName}}</v-btn>
                                    </v-flex>
                                    
                                    <v-flex xs4 md4 lg4  >
                                                <v-layout row wrap justify-center v-if="!this.subCategories.length == 0">
                                                    <v-flex  xs12 md12 lg12>
                                                       <p>Sub Cetagory</p> 
                                                    </v-flex>
                                                </v-layout>
                                                <v-layout row wrap justify-center>
                                                    <v-flex xs12 md12 lg12 v-for="(item, index) in this.subCategories" :key="item.index">
                                                        <v-btn x-small color="green lighten-2">{{index+1}}:{{item.subCategoryName}}</v-btn><v-btn x-small color="error" @click="removeItem(index)">-</v-btn>
                                                    </v-flex>
                                                </v-layout>   
                                                   
                                        <br>
                                    </v-flex>
                                    <v-flex xs4 md4 lg4 v-if="!this.imageLink == ''">
                                        <v-img class="mx-7 grey" :src="this.imageLink" height="100" width="100"></v-img>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap justify-start>
                                    <v-flex xs6 sm3 md3 lg3 class="ml-3 mt-6 mr-10">
                                         <v-btn x-small color="primary" class=" mx-5" @click="onPickFileCat">Product Photo </v-btn>
                                                 <input type="file" 
                                                 style="display: none" 
                                                ref="fileInputCat"
                                                 accept="image/*"
                                                     @change ="onFilePickedCat"
                                
                                >
                                    </v-flex>
                                     <v-flex xs6 sm3 md3 lg3 class="ml-1 mx-5">
                                        <v-text-field v-model="categoryName" label="Category">
                                            
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs6 sm4 md4 lg4 class="ml-1" >
                                         <v-text-field v-model="subCategorieValue.subCategoryName" label="Sub Cetagory">                 
                                        </v-text-field>
                                        <v-btn x-small color="info" @click="addsubCategory">Add another Sub Category+</v-btn>
                                    </v-flex>
                                   
                                </v-layout>
                                 <v-layout row wrap justify-center>
                                        <v-flex xs10 md10 lg10  >
                                            <v-btn  type="submit" small color="green" block class="my-3">Create</v-btn>
                                        </v-flex>
                                    </v-layout>
                      
                        </v-flex>
                        </v-layout>
                        </v-form>
                 </v-flex>
             </v-layout>
        <v-form class="mx-3"  @submit.prevent="onUploadProduct">
               <v-layout row wrap justify-center class="my-1" style=" border-top: outset; border-color:grey">
                    <v-flex xs12 sm10 md10 lg10  class="my-2">
                        <v-layout row wrap justify-center class="my-3">
                            <v-flex xs12 sm4 md4 lg4 class="mx-2 mt-4">
                                 <v-select
                                    @change="subCategoryAdd"
                                    :items="categoriesItem"
                                     item-text="categoryName"
                                    v-model="category"
                                    label="Category*"
                                     dense
                                ></v-select>
                            </v-flex>
                            <v-flex xs5 sm3 md3 lg3 class="mx-2 mt-4">
                                <v-select
                                     @change="statusAdd"
                                    :items="status"
                                    label="Product Status*"
                                    v-model="statusValue"
                                     dense
                                ></v-select>
                            </v-flex>
                             <v-flex xs12 sm3 md3 lg3 class="mx-2 mb-3">
                                <v-text-field
                                v-model="id"
                                label="Product ID*"
                            ></v-text-field>
                            </v-flex>
                           
                        </v-layout>
                        <v-layout>
                              <v-flex v-if="this.addCategory" xs5 sm4 md4 lg4 class="mx-2 ">
                                  <v-text-field
                                label="Set Category"
                                v-model="category"
                                 ></v-text-field>
                            </v-flex>
                             <v-flex xs5 sm3 md3 lg3 class="ml-6 ">
                                  <v-text-field
                                label="Unit quantity*"
                                v-model="reviews.unitQuantity"
                                 ></v-text-field>
                            </v-flex>
                             <v-flex xs6 sm3 md3 lg3 class="ml-6 ">
                                  <v-text-field
                                label="quantity*"
                                v-model.number="quantity"
                                 ></v-text-field>
                            </v-flex>

                             <v-flex v-if="!this.subCategoryValue.length == 0" xs5 sm5 md5 lg5 class="mx-2 mt-4">
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
                            <v-flex xs12 sm11 md11 lg11>
                                <v-text-field
                                v-model="name"
                                label="Product Title*"
                            ></v-text-field>
                            </v-flex>
                            
                        </v-layout>
                        <v-layout row wrap justify-center >
                            <v-flex xs6 md6 sm6 lg6 text--center style=" border-right: outset; border-color:grey;">
                                  <v-btn small outlined class="  mt-7 mx-5" @click="onPickFile">Product Photo </v-btn>
                                <input type="file" 
                                style="display: none" 
                                ref="fileInput"
                                accept="image/*"
                                @change ="onFilePicked"
                                
                                >
                            </v-flex>
                            <v-flex xs6 sm6 md6 lg6 justify-center>
                                  <v-img class="mx-7 grey" :src="this.prodouctImages[0]" height="150" width="190"></v-img>
                            </v-flex>
                        </v-layout>

                        <v-layout row wrap justify-center>
                           
                             <v-flex xs12 sm4 md4 lg4 class="mx-2">
                                <v-text-field
                                label="Product Price*"
                                v-model="ogPrice"
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
                                v-model="price"
                                label="Discount Price*"
                            > </v-text-field>
                            </v-flex>
                             
                        </v-layout>
                        <v-layout row wrap justify-start>
                            <v-flex xs12 md10 lg10 sm10 text-start class="ml-7" >
                                <v-btn @click="addititionalButton" x-small color="info"> Additional Info + </v-btn>
                            </v-flex>
                            <v-flex xs12 md12 lg12 sm12 v-if="addititionalInfoButton">
                                <v-layout row wrap justify-center>
                                    <v-flex xs6 sm4 md4 lg4 class="ml-3">
                                        <v-text-field v-model="additionalInfo.manufactureDate" label="Manufecture Date">
                                            
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

                           
                            <v-flex xs10 sm10 md10 lg10>
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
                         
                    <v-btn :disabled="!formValidation" color="primary" type= "submit"  small block>Upate</v-btn>                     
                    </v-flex>
            </v-layout>
        </v-form>
         </v-flex>
    </v-layout>
 </v-container>
</template>
<script>
import * as firebase  from 'firebase/app'
import 'firebase/firestore'
 export default {
     data () {
        
         return {
             categoriesItem:[],
             addititionalInfoButtonDelete:false,
             addititionalInfoButton:false,
             addititionalCategoryButton:false,
             key: Math.random().toString(36).substring(2,9),
             imageLink:'',

             categoryName:'',
             subCategorieValue:{
                 subCategoryName:''
             },
             subCategories:[],
         
             statusValue:'',
                discountPercentage:'',
               additionalInfo:{
                bestBefore:'',
                brand:'',
                manufactureDate:'',
                shelfLife:'',
                other:''
            },

             category:'',
             description:'',
             featured:'',
             id:'PD00000000',
             inStock:true,
             isListed:true,
             name:'',
             ogPrice:'',
             price:'',  
             queAndAns:{},
            
             prodouctImages:[],
             quantity:null,

             reviews:{
                 subCategory:'',
                 timestamp:new Date(),
                 trending:true,
                 unitQuantity:'',
                 view:'',

             },

             addCategory:false,
             subCategoryValue:[],  
             date: new Date(),
             image: null,
             status: [ 'In Stock', 'Stock Out'],
             discount:['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50','55','60', '65', '70', '75', 'Manually']
         }
     },
     computed: {
         formValidation () {
             return this.category !== '' &&
              this.description !== '' 
              && this.id !== ''
             && this.name !== ''
            && this.ogPrice !== ''
              && this.quantity !== ''
            
         },

         
        
     },
       created(){
             firebase.firestore().collection('Categories').get().then((querySnapshot)=>{
                 querySnapshot.forEach((doc)=>{
                     this.categoriesItem.push(doc.data())
                 })
             })

        
     },
     methods: {
            statusAdd(){
                if(this.statusValue)
                    {
                        this.inStock = true
                    }
                    else{
                         this.inStock = false
                    }
            },

          subCategoryAdd() {
                for ( let i = 0; i < this.categoriesItem.length ; i++) {
                    if(  this.category ==   this.categoriesItem[i].categoryName ){
                        this.subCategoryValue.length = 0
                         this.subCategoryValue = this.categoriesItem[i].subCategories
                    }
                }
            
        },
        discountPrice(){
          
            const price = this.ogPrice
            let discount =   this.discountPercentage/100
            const discountPrice = price * discount
            this.price = (price  - discountPrice)
        },
        removeItem(e){
            this.subCategories.splice(this.subCategories.indexOf(e), 1);
        },
        onUploadProductCategory(){
              var db = firebase.firestore();
             db.collection("Categories").doc(this.key).set({
                   
                 
                categoryName:this.categoryName,
                categoryId:this.key,
                imageLink:this.imageLink,
                 subCategories:this.subCategories,         

              }).then(function() {
                    alert("Categorie Upded")
                    });
        },
          onDeleteCategorie (id) {
          
              this.DeleteDialog = false
            var db = firebase.firestore();
             db.collection("Categories").doc(id).delete().then(()=>{
               console.log("oka")
               alert("Delete")
             })
                 
         },
         onUploadProduct () {
           
            var db = firebase.firestore();
             db.collection("Products").doc(this.id).set({
                   
                    additionalInfo:{
                     bestBefore:this.additionalInfo.bestBefore,
                     brand:this.additionalInfo.brand,
                     manufactureDate:this.additionalInfo.manufactureDate,
                    shelfLife:this.additionalInfo.shelfLife,
                    other:this.additionalInfo.other
                  },

             category:this.category,
             description:this.description,
             featured:this.featured,
             id:this.id,
             inStock:true,
             isListed:true,
             name:this.name,
             ogPrice:this.ogPrice,
             price:this.price, 
             queAndAns:this.queAndAns,
             productImages:this.prodouctImages,
             quantity:this.quantity,

             reviews:{
                 subCategory:this.reviews.subCategory,
                 timestamp:this.reviews.timestamp,
                 trending:this.reviews.trending,
                 unitQuantity:this.reviews.unitQuantity,
                 view:this.reviews.view,

             }
              }).then(function() {
                    alert("Product Uploaded")
                    });
           
            
         },
         onPickFile ()  {
                this.$refs.fileInput.click()
         },
            onPickFileCat ()  {
                this.$refs.fileInputCat.click()
         },
         addsubCategory(){
           this.subCategories.push(this.subCategorieValue)
           this.subCategorieValue = {}
         },
         addititionalButtonCategoryDelete(){
              this.addititionalInfoButtonDelete = !  this.addititionalInfoButtonDelete
         },
         addititionalButton(){
             this.addititionalInfoButton = !  this.addititionalInfoButton
         },
         addititionalButtonCategory(){
            this.addititionalCategoryButton = !this.addititionalCategoryButton
         },
         onFilePicked (event) {
             if(event.target.files[0]){
                    const file = event.target.files[0]
                    var storageRef = firebase.storage().ref('productImages/' +file.name);
                    var uploadTask = storageRef.put(file);
                    uploadTask.on('state_changed', ()=>{

                        }, (error)=> {
                            console.log(error)
                    }, ()=> {
            
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=> {
                        this.prodouctImages.push(downloadURL)
                        console.log(  this.prodouctImages)
             });
            });
             }
     
             },
              onFilePickedCat (event) {
        const file = event.target.files[0]
        var storageRef = firebase.storage().ref('categoryImages/' +file.name);
        var uploadTask = storageRef.put(file);
        uploadTask.on('state_changed', ()=>{

            }, (error)=> {
                console.log(error)
        }, ()=> {
  
         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=> {
              this.imageLink =downloadURL
              console.log(  this.imageLink)
             });
            });
             }
             
         }
    }
</script>
