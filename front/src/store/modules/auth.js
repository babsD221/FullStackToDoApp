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
            isAuthorized: false,
            validData: true,
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
        async authenticate(context, payload) {
            console.log("in authenticate");
            let url = "/login";

            const data = JSON.stringify(payload);
            const response = await authService.post(url,data);
                if('message' in response.data) {
                    context.commit('setIsAuthorized',false);
                    context.commit('setValidData',false);
                }
                else {
                    console.log("valid message");
                    context.commit('setIsAuthorized',true);
                    console.log(context.getters['isAuthorized']);
                    context.commit('setJwtToken',response.data['token']);
                    context.commit('setUserData',response.data['id']);
                    context.commit('setIsAuthenticate');
                    router.push('/tasks');
                }
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
        },
        setValidData(state,boolValue) {
            state.validData = boolValue;
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
          },
          isDataValid(state) {
              return state.validData;
          }
          
    }
}