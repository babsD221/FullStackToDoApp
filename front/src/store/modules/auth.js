import { authService } from './../../api';
import router from '../../router.js'

export function isValidJwt (jwt) {
    console.log("in verification");
    console.log(jwt);
    if (!jwt || jwt.split('.').length < 3) {
      return false;
    }
    const data = JSON.parse(atob(jwt.split('.')[1]));
    const exp = new Date(data.exp * 1000) ;
    const now = new Date();
    return now < exp;
}
export default {
    namespaced:true,

    state() {
        return {
            isAuthenticated:false,
            isAuthorized: false
        };

    },
    actions: {

        signup(context, payload) {
            let url = "/register";

            const autData = JSON.stringify(payload);
            authService.post(url,autData).then(response => {
                console.log(response);
            }).catch((err) => {
                console.log(err)
            });
            context.commit('setUserData',{payload})
            router.push('/');
        },
        authenticate(context, payload) {

            let url = "/login";

            const data = JSON.stringify(payload);
            authService.post(url,data).then(response => {
                console.log(response);
                if('message' in response.data) {
                    context.commit('setIsAuthorized',false);
                }
                else {
                    context.commit('setIsAuthorized',false);
                    context.commit('setJwtToken',response.data['token']);
                    context.commit('setUserData',response.data['id']);
                    context.commit('setIsAuthenticate');
                }

                });
        },
        logout(context) {
            let url = "/logout";

            let data  = {};
            authService.post(url,data).then(response =>{
            context.commit('setJwtToken',response.data['token']);
            context.commit('setIsAuthenticate');
        });
            
        }
        
    },
    mutations: {
        setUserData(state,payload) {
            localStorage.userId = payload
        },
        setIsAuthenticate(state) {
            if(isValidJwt(localStorage.getItem('token'))) {
                state.isAuthenticated = true; 
                return;
            }
            state.isAuthenticated = false;
            
        },
        setJwtToken (state, payload) {
            localStorage.token = payload  
            console.log(localStorage.getItem('token')) ;         
        },
        setIsAuthorized(state,boolValue) {
            state.isAuthorized=boolValue;
        }

    },
    getters: {
        userId(state) {
            return state.userId;
          },
          token(state) {
            return state.token;
          },
          isAuthenticated(state) {
              console.log(state);
            return state.isAuthenticated;
          },
          isAuthorized(state) {
              return state.isAuthorized;
          }
          
    }
}