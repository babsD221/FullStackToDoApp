import { authService } from './../../api';

export function isValidJwt (jwt) {
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
        };

    },
    actions: {

        signup(context, payload) {
            let url = "http://127.0.0.1:5050/register";

            const autData = JSON.stringify(payload);
            authService.post(url,autData).then(response => {
                console.log(response);
            }).catch((err) => {
                console.log(err)
            });
            context.commit('setUserData',{payload})
        },
        authenticate(context, payload) {

            let url = "/login";

            const data = JSON.stringify(payload);
            authService.post(url,data).then(response => {
                console.log(response);
                context.commit('setJwtToken',response.data['token']);
                context.commit('setUserData',response.data['id']);
                        });
        },
        logout(context) {
            let url = "/logout";

            let data  = {};
            authService.post(url,data).then(response =>{
                context.commit('setJwtToken',response.data['token']);
        });
            
        }
        
    },
    mutations: {
        setUserData(state,payload) {
            localStorage.userId = payload
        },
        setJwtToken (state, payload) {
            localStorage.token = payload            
        },

    },
    getters: {
        userId(state) {
            return state.userId;
          },
          token(state) {
            return state.token;
          },
          isAuthenticated() {
            return isValidJwt(localStorage.getItem('token'));
          }
    }
}