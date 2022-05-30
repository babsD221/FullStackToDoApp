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
            jwt: '',
        };

    },
    actions: {

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
        async authenticate(context, payload) {

            let url = "http://127.0.0.1:5050/login";
            const headers = {
                'Content-type':'application/json',
                'Accept': 'application/json',
                
            };
            const data = JSON.stringify(payload);
            await axios.post(url,data,{
                headers:headers
            }).then(response => {
                console.log(response);
                context.commit('setJwtToken',response.data['token']);
                context.commit('setUserData',response.data['id']);
                        });
        },
        logout(context) {
            let url = "http://127.0.0.1:5050/logout";
            const headers = {
                'Content-type':'application/json',
                'Accept': 'application/json',    
            };
            let data  = {};
            axios.post(url,data,{
                headers:headers
            }).then(response =>{
                console.log(response.data['token']);
                context.commit('setJwtToken',response.data['token']);

        });
            
        }
        
    },
    mutations: {
        setUserData(state,payload) {
            state.userId = payload;
            console.log(state.userId)
        },
        setJwtToken (state, payload) {
            localStorage.token = payload
            state.token = payload;
            console.log(payload);

        },

    },
    getters: {
        userId(state) {
            return state.userId;
          },
          token(state) {
            return state.token;
          },
          isAuthenticated(state) {
            return isValidJwt(state.token)
          },
          jwt(state) {
              return state.jwt;
          }
    }
}