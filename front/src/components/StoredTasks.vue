<template>
      <ul class=" p-0 m-auto max-w-md">
    <Task  v-for="task in tasks" :key="task.id" :id="task.id"  :description="task.description" />
  </ul>
</template>

<script>
import Task from './Task.vue'
/* import axios from 'axios'
 */
export default {
  name: 'App',
  components: {
    Task
    },
    computed: {
        tasks: function() {
            return this.$store.getters['tasksList/tasks'];
        }
    },
    provide() {
        return {
/*             addTask: this.addTask,
 */            removeTask: this.removeTask,
                getTasks: this.getTasks
        };
    },

    created() {
/*         this.getTasks();
 */        this.$store.commit('tasksList/getTasks');
    },
    methods: {
/*        getTasks() {
           console.log("In get tasks");
            const backPath = "http://127.0.0.1:5050/";
            axios.get(backPath)
            .then(res => {
                this.tasksList = res.data;
                console.log(this.tasksList);
            })
            .catch((err) => {
                console.error(err)
            })

        }, */
        removeTask(taskId) {
            const taskIndex = this.$store.state.tasks.findIndex(task => task.id === taskId);
            console.log(taskIndex);
            this.$store.tasksList.splice(taskIndex, 1);
        } 
    }
}

</script>

