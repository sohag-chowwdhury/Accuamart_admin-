import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase/app'
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/storage';
import '@firebase/database';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        
        user: null,
        error: null
    },
    mutations: {
       
        
        setUser(state, payload) {
            state.user = payload 
        },
       
         setError (state, payload) {
            state.error = payload
        },
        clearError (state)  {
            state.error = null
        } 
    },
    actions: {
        signUserIn({commit}, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email,  payload.password)
              .then(()=>{
                firebase.auth().onAuthStateChanged(function(user) {                    
                      commit('setLoading', false)
                      const newUser = {
                          id: user.uid,
                          registeredMeetups: []
                      }
                      commit('setUser', newUser)
                     
                
                })
                }
              ).catch(
                  error =>{
                      console.log(error)
                  }
              )
          },
          signUserUp({commit}, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email,  payload.password)
              .then(()=>{
                firebase.auth().onAuthStateChanged(function(user) {                    
                      commit('setLoading', false)
                      const newUser = {
                          id: user.uid,
                          registeredMeetups: []
                      }
                      commit('setUser', newUser)
                     
                
                })
                }
              ).catch(
                  error =>{
                      console.log(error)
                  }
              )
          },
          autoSignIn({commit}, payload){
               commit('setUser', {id: payload.uid,  registeredMeetups: []})
          }, 
          logOut ({commit}) {
              firebase.auth().signOut()
            commit('setUser', null)
          } ,
          clearError ( {commit}) {
                 commit('clearError')
          }
    },
    getters: {
       
        user (state) {
            return state.user
        },
        error (state) {
         return state.error
          }
    }
})