import axios from 'axios'
export default {
    namespaced:true,
    state() {
        return {
            tasks:[]
        }
    },
    getters: {
        tasks(state) {
            return state.tasks;
        }
    },
    mutations: {
        getTasks(state) {
            console.log("In get tasks");
            const backPath = "http://127.0.0.1:5050/";
            axios.get(backPath)
            .then(res => {
                state.tasks = res.data;
                console.log(state.tasks);
            })
            .catch((err) => {
                console.error(err)
            })
        },
        removeTask(state,taskId) {
            const taskIndex = state.tasks.findIndex(task => task.id === taskId);
            state.tasks.splice(taskIndex, 1);
        },
        addTask(state,taskDescription) {

            const backPath = "http://127.0.0.1:5050/create";

            const newTask = {
                description: taskDescription
            };
            const headers = {
                'Content-type':'Authorization,application/json',
                'Accept': 'Authorization,application/json',
                
            }
            axios.post(backPath,newTask,{
                headers:headers
            });
            state.tasks.unshift(newTask);
        },

        
    }
}