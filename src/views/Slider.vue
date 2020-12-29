<template>
    <v-container>
        <v-layout row wrap justify-center>
                <v-flex text-center xs12  sm12 md12 lg12>
                <v-btn  x-small color="orange " @click="sliderUpload" v-if="!SliderUploadButton" class="my-5">slider Upload</v-btn>
                <v-btn  x-small color="info " @click="sliderUpload" v-if="SliderUploadButton" class="my-5">MinimiZe Section</v-btn>
                </v-flex>
            </v-layout>
        <v-layout row wrap  justify-center>
            
            <v-flex xs11 sm10 md10 lg10 text-center v-if="SliderUploadButton">
               
            <v-form @submit.prevent="onUploadSlider">
                <v-layout row wrap justify-center  SliderUploadButton>                   
                     <v-flex xs4 md4 sm4 lg4 text-center style=" border-right: outset; border-color:grey;">
                                  <v-btn small outlined class="  mt-7 mx-5" @click="onPickFile">Product Photo </v-btn>
                                <input type="file" 
                                style="display: none" 
                                ref="fileInput"
                                accept="image/*"
                                @change ="onFilePicked"
                                >
                            </v-flex>
                            <v-flex xs6 sm6 md6 lg6 text-center>
                                  <v-img class="mx-7 grey" :src="this.slidertImages" height="150" width="190"></v-img>
                            </v-flex>
                             <v-flex xs12 sm8 md8 lg8 text-center class="ml-1" >
                                    <v-text-field v-model="heading" label="Slider Heading">                                      
                                    </v-text-field>
                            </v-flex>
                            
                </v-layout>
                <v-layout row wrap justify-center>
                    <v-flex sm5 xs5 md5 lg5>                     
                        <v-btn type="submit" block x-small color="info"> upload</v-btn>
                    </v-flex>
                </v-layout>
             </v-form>   
            </v-flex>
           
        </v-layout>
         <v-layout row wrap justify-center>
                <v-flex text-center xs12  sm12 md12 lg12>
                <v-btn  x-small color="error " @click="sliderDelete" v-if="!SliderDeleteButton" class="my-5">slider Delete</v-btn>
                <v-btn  x-small color="info " @click="sliderDelete" v-if="SliderDeleteButton" class="my-5">MinimiZe Section</v-btn>
                </v-flex>
            </v-layout>
          <v-layout row wrap justify-center v-if="SliderDeleteButton">

                <v-flex xs10 sm10 md10 lg10   v-for="(slider,index) in sliderItem"
                        :key="slider.index"
                      >
                    <v-layout row wrap justify-center class="my-1 grey darken-1" >
                       
                        <v-flex xs6 sm2 md2 lg2>
                            <p class="mt-3 mx-3">{{index+1}}</p>
                        </v-flex>
                        <v-flex xs6 sm3 md3 lg3>
                            <v-img  class="my-1"  :src="slider.slidertImages" width="55"></v-img>
                        </v-flex>
                        <v-flex xs8 sm5 md5 lg5>
                           <h4 class="my-3 white--text"> {{slider.heading}}</h4>
                        </v-flex>
                         <v-flex xs4 sm2 md2 lg2 >
                             <v-btn  class="orange mt-3"  @click="onDeleteSlider(slider.key)" x-small color="error">Delete</v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-divider>

            </v-divider>
         <v-layout row wrap justify-center>
             <v-flex xs12 sm10 md10 lg10 text-center class="my-4">
                <v-btn class="mt-4" color="black white--text" block x-small>Your silider Item</v-btn>
             </v-flex>
                <v-flex xs12 sm10 md10 lg10 >
                    <v-carousel v-model="model" height="300px"
                        cycle
                        hide-delimiter-background
                        show-arrows-on-hover>
                        <v-carousel-item
                      
                        v-for="slider in sliderItem"
                        :key="slider.index"
                        :src="slider.slidertImages"
                        >    
                            <v-flex text-center class="mt-10">  <h3 class="orange darken-4 py-2 white--text">{{slider.heading}}</h3>  </v-flex>              
                        </v-carousel-item>
                    </v-carousel>
                </v-flex>
            </v-layout>
          
    </v-container>
</template>
<script>
import * as firebase  from 'firebase/app'
import 'firebase/firestore'
export default {
    data(){
        return{
          SliderDeleteButton:false,
            SliderUploadButton:false,
            slidertImages:'',
             heading:'',
             sliderItem:[],
            key: Math.random().toString(36).substring(2,9),

        }
    },
     created(){
             firebase.firestore().collection('Slider').get().then((querySnapshot)=>{
                 querySnapshot.forEach((doc)=>{
                     this.sliderItem.push(doc.data())
                     console.log( this.sliderItem)
                 })
             })   
     },
    methods:{
          onUploadSlider(){
              var db = firebase.firestore();
             db.collection("Slider").doc(this.key).set({
                   
                 key:this.key,
                heading:this.heading,
                slidertImages:this.slidertImages,

              }).then(function() {
                    alert("Slider Upded")
                    });
        },
         onDeleteSlider (e) {
          
              this.DeleteDialog = false
            var db = firebase.firestore();
             db.collection("Slider").doc(e).delete().then(()=>{
               console.log("oka")
               alert("Delete done")
             })
                 
         },
        onPickFile ()  {
                this.$refs.fileInput.click()
         },
         sliderUpload(){
             this.SliderUploadButton = !this.SliderUploadButton
         },
         sliderDelete(){
            this.SliderDeleteButton = !this.SliderDeleteButton
         },
          onFilePicked (event) {
             if(event.target.files[0]){
                    const file = event.target.files[0]
                    var storageRef = firebase.storage().ref('SliderImages/' +file.name);
                    var uploadTask = storageRef.put(file);
                    uploadTask.on('state_changed', ()=>{

                        }, (error)=> {
                            console.log(error)
                    }, ()=> {
            
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=> {
                        this.slidertImages = downloadURL
                        console.log(  this.slidertImages)
             });
            });
             }
     
             }
    }
}
</script>