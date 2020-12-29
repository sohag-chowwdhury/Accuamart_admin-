<template>
  <v-row>
    <v-dialog  v-model="EditDialog"  persistent max-width="600px">
      <template v-slot:activator="{ on }">   
          <v-btn v-on="on" text small>
               <v-icon color="" class="mr-2">
                  mdi-account-multiple-plus-outline</v-icon>Add Admin
          </v-btn>
      </template>
      
       <v-container>
        <v-card class="mx-2"  xs12 sm6 offset-sm3>
             <v-btn depressed  class="mx-2" color="" @click="EditDialog = false">
                    <v-icon>mdi-close-circle</v-icon>
                </v-btn>
        <v-layout row class="mx-3">
            <v-flex xs12 offset-sm3 class="red--text my-3">
                <h4>Create New Admin  Account </h4>
            </v-flex>
           
        </v-layout>
        <v-layout row v-if="error">
            <v-flex xs12 offset-sm3 >
               <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
            </v-flex>
        </v-layout>
         <v-form class="mx-3"  @submit.prevent="onSignup">
             <v-layout row xs12 sm6 offset-sm3>
                 <v-flex  xs12 sm6 offset-sm3>
                     <v-layout row >
                         <v-flex xs12 sm12 md12 lg12 class="mx-2">
                            <v-text-field
                            name="email"
                            label="Email"
                            id="email"
                            v-model="email"
                            required >      
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12 sm12 md12 lg12  class="mx-2">
                            <v-text-field
                            name="password"
                            label="Password"
                            id="password"
                            v-model="password"
                            required >      
                            </v-text-field>
                        </v-flex>
                         <v-flex xs12 sm12 md12 lg12 class="mx-2">
                        <v-text-field
                        name="confarmPassword"
                        label="Confarm Password"
                        id="confarmPassword"
                        v-model="confarmPassword"
                        :rules="[passwordMatch]"
                        required >      
                        </v-text-field>
                    </v-flex>
                     </v-layout>
                 </v-flex>
            </v-layout >
            <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-btn class="info" x-small type="submit">Next -></v-btn>
            </v-flex>
          </v-layout>
       </v-form>
       </v-card>
    </v-container>
    </v-dialog>
  </v-row>
</template>
<script>
 export default {
     data () {
         return {
            EditDialog: false,
             email: '',
             password: '',                 
            confarmPassword: '',
             
         }
     },
     computed: {
         formValidation () {
             return this.email !== '' &&
              this.password !== '' &&
             this.confarmPassword !== ''
            
         },
         passwordMatch () {
             return this.password != this.confarmPassword ? " Password Not Match" : ''
         },
         user() {
             return this.$store.getters.user
         },
          error () {
             return this.$store.getters.error
         },
         loading () {
             return this.$store.getters.loading
         }
     },
    
      methods: {
         onSignup () {
            this.EditDialog = false
            this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
            this.$router.push('/admin/info')

         },
        
     }
     
 }
</script>