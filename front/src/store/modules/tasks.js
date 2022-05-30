import axios from 'axios'
export default {
    namespaced:true,
    state() {
        return {
            tasks:[],
            completedTasks:[]
        }
    },
    getters: {
        tasks(state) {
            return state.tasks;
        },
        completedTasks(state) {
            return state.completeTasks;
        }
    },
    mutations: {
        pushToTasks(state,newTask) {
            state.tasks.unshift(newTask);
        },
        setTasks(state,data){
            state.tasks = data;
        },
        setCompletedTasks(state,data){
            state.completeTasks = data;
        },
        removeAllTasks(state) {
            state.tasks =[]
        },
        
        removeTask(state,payload) {
            const path = "http://127.0.0.1:5050/remove";
            const taskIndex = state.tasks.findIndex(task => task.id === payload['id']);
            console.log(payload['id']);
            console.log(taskIndex);
            state.tasks.splice(taskIndex, 1);

            const headers = {
                Authorization: `Bearer: ${payload['token']}`,
                "Content-Type":"application/json"
                
            }
            const data = {
                'id': payload['id'],
                'user_id':payload['user_id']
            };
            axios.post(path,data,{
                headers:headers
            });
            
        },

        completeTask(state,payload) {
            const taskIndex = state.tasks.findIndex(task => task.id === payload['id']);
            state.tasks[taskIndex] = {
                description: state.tasks[taskIndex].description,
                completed:true,
                id:payload['id']
            }
            const path = "http://127.0.0.1:5050/complete";
            const headers = {
                Authorization: `Bearer: ${payload['token']}`,
                "Content-Type":"application/json"
                
            }
            const data = {
                id: payload['id']
            };
            axios.post(path,data,{
                headers:headers
            });
        }
        
    },
    actions: {
        addTask(context,payload) {

            const backPath = "http://127.0.0.1:5050/create";
            const newTask = {
                description: payload['description'],
                completed:payload['completed']
            };
            const headers = {
                Authorization: `Bearer: ${payload['token']}`,
                "Content-Type":"application/json"
                
            }
            console.log(newTask)
            axios.post(backPath,newTask,{
                headers:headers
            });
            context.commit('pushToTasks',newTask);
        },
    }
}