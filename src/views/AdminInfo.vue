
<template>
       <v-container >       
        <v-layout row  class="mx-3" >
             <v-flex justify-center text-center class="red--text my-3">
                <h4>New Admin information</h4>
            </v-flex>
        </v-layout>
        
             <v-layout row justify-center>
                <v-form  @submit.prevent="onUploadProductCategory"> 
                 <v-flex xs12 sm10 md10 lg10  class="my-2">
                        <v-layout row wrap justify-center class="my-3">
                            <v-flex xs12 sm11 md11 lg11 class="mx-2">
                                 <v-select
                                    :items="adminType"
                                    label="Admin Rolle*"
                                    v-model="accountStatus"
                                     dense
                                ></v-select>
                            </v-flex>                                             
                        </v-layout>
                         <v-layout row wrap justify-center>
                            <v-flex xs12 sm12 md12 lg12>
                                <v-text-field
                                label="Name*"
                                v-model="name"
                            ></v-text-field>
                            </v-flex>
                               <v-flex xs12  sm12 md12 lg12class="mx-2">
                                <v-text-field
                                label="Mobile Number*"
                                v-model="mobileNo"
                                 ></v-text-field>
                            </v-flex>                          
                        </v-layout>
                        <v-layout row wrap justify-center >
                            <v-flex xs6 md6 sm6 lg6 text--center style=" border-right: outset; border-color:grey;">
                                  <v-btn small outlined class="  mt-7 " @click="onPickFile">Product Photo </v-btn>
                                <input type="file" 
                                style="display: none" 
                                ref="fileInput"
                                accept="image/*"
                                @change ="onFilePicked"
                                
                                >
                            </v-flex>
                            <v-flex xs6 sm6 md6 lg6 justify-center>
                                 <v-avatar size="90" class="ml-10">
                                      <v-img class="mx-7 grey" :src="imageUrl" height="150" width="190"></v-img>
                                 </v-avatar>
                            </v-flex>
                        </v-layout>

                        <v-layout row wrap justify-center class="my-5">
                           
                           <v-flex xs12 sm12 md12 lg12 class="mx-2">
                                <v-text-field
                                label="Other Email*"
                                v-model="email"
                                 ></v-text-field>
                            </v-flex>
                           
                            
                        </v-layout>
                      
                    <v-btn color="black" type="submit" outlined small block >Upate</v-btn>                     
                    </v-flex>
                </v-form>
          </v-layout>
    </v-container>
</template>
<script>
import * as firebase  from 'firebase/app'
import 'firebase/firestore'
 export default {
     data () {
        
         return {
             imageUrl:'',
             description: '',
             accountStatus:'',
             name:'',
             mobileNo:'',
             uid:'',
             email:'',
             date: new Date(),
             image: null,
             adminType: ['Primary Admin', 'Secondary Admin'],
            
         }
     },
     computed: {
         formValidation () {
             return this.title !== '' &&
              this.location !== '' &&
             this.imageUrl !== ''
              && this.description !== ''
         },
         userAuth () {
         return this.$store.getters.user  !== null &&  this.$store.getters.user !== undefined
       }
     },
     methods: {
          onUploadProductCategory(){
              var db = firebase.firestore();
             db.collection("Admins").doc(this.uid).set({
                   
                 
                name:this.name,
                mobileNo:this.mobileNo,
                uid:this.uid,
                profileImageUrl:this.imageUrl,
                 primaryAdmin:true,   
                 timestamp:this.date,
                 email:this.email,
                 accountStatus:this.accountStatus   

              }).then(function() {
                    alert("Categorie Upded")
                    });
        },
       
         onPickFile ()  {
                this.uid= this.$store.getters.user.id
                console.log(  this.uid)
                this.$refs.fileInput.click()
         },
         
         onFilePicked (event) {
                if(event.target.files[0]){
                    const file = event.target.files[0]
                    var storageRef = firebase.storage().ref('profileImages/' +file.name);
                    var uploadTask = storageRef.put(file);
                    uploadTask.on('state_changed', ()=>{
                        }, (error)=> {
                            console.log(error)
                    }, ()=> {
            
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=> {
                        this.imageUrl=downloadURL
                        console.log(  this.prodouctImages)
             });
            });
             }
      }
      
     }
 }
</script>
