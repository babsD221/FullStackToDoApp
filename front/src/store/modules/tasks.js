/* import axios from 'axios'
 */import { authService } from './../../api';
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
            state.tasks = data.reverse();
        },
        setCompletedTasks(state,data){
            state.completeTasks = data;
        },
        removeAllTasks(state) {
            state.tasks = []
        },
        
        removeTask(state,payload) {
            const path = "/remove";
            const taskIndex = state.tasks.findIndex(task => task.id === payload['id']);
            state.tasks.splice(taskIndex, 1);

            const headers = {
                Authorization: `Bearer: ${payload['token']}`,
                "Content-Type":"application/json"
                
            }
            const data = {
                'id': payload['id'],
            };
            authService.post(path,data,{
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
            const path = "/complete";
            const headers = {
                Authorization: `Bearer: ${payload['token']}`,
                "Content-Type":"application/json"
                
            }
            const data = {
                id: payload['id']
            };
            authService.post(path,data,{
                headers:headers
            });
        }
        
    },
    actions: {
        addTask(context,payload) {

            const backPath = "/create";
            let newTask = {
                description: payload['description'],
                completed:payload['completed'],
            };
            console.log(newTask.id)      
            const headers = {
                Authorization: `Bearer: ${payload['token']}`,
                "Content-Type":"application/json"
                
            }
            authService.post(backPath,newTask,{
                headers:headers
            }).then(response =>{
                newTask = {
                    description: response.data['description'],
                    completed:response.data['completed'],
                    id: response.data['id']
                };
                context.commit('pushToTasks',newTask);
            });
        }
    }
}