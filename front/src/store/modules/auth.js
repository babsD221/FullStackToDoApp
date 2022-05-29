import axios from 'axios';

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
            userId: null,
            token: null,
            user: {},
            jwt: ''
        };

    },
    actions: {
        login() {

        },
        signup(context, payload) {
            console.log("In auth");
            let url = "http://127.0.0.1:5050/register";
            const headers = {
                'Content-type':'application/json',
                'Accept': 'application/json',
                
            }
            const autData = JSON.stringify(payload);
            console.log(autData);
            axios.post(url,autData,{
                headers:headers
            }).then(response => {
                console.log(response);
            }).catch((err) => {
                console.log(err)
            });
            context.commit('setUserData',{payload})
        },
        authenticate(context, payload) {

            let url = "http://127.0.0.1:5050/login";
            const headers = {
                'Content-type':'application/json',
                'Accept': 'application/json',
                
            };
            const data = JSON.stringify(payload);
            axios.post(url,data,{
                headers:headers
            }).then(response => context.commit('setJwtToken',{jwt: response.data}));
        }
        
    },
    mutations: {
        setUserData(state,payload) {
            state.token = payload.token;
            state.userId = payload.userId;
        },
        setJwtToken (state, payload) {
            console.log('setJwtToken payload = ', payload)
            localStorage.token = payload.jwt.token
            state.jwt = payload.jwt
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
            return isValidJwt(state.jwt.token)
          }
    }
}