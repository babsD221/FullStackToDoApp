<template>
      <ul class=" p-0 m-auto max-w-md">
    <Task  v-for="task in $store.state.tasks" :key="task.id" :id="task.id"  :description="task.description" />
  </ul>
</template>

<script>
import Task from './Task.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    Task
    },
    provide() {
        return {
            tasks: this.tasks,
/*             addTask: this.addTask,
 */            removeTask: this.removeTask,
                getTasks: this.getTasks
        };
    },
    mounted() {
        this.$emit('toParent',this.tasks);
    },
   data() {
        return {
            tasks: []
        };
    },
    created() {
        this.getTasks();
    },
    methods: {
       getTasks() {
           console.log("In get tasks");
            const backPath = "http://127.0.0.1:5050/";
            axios.get(backPath)
            .then(res => {
                this.$store.state.tasks = res.data;
                console.log(this.$store.state.tasks);
            })
            .catch((err) => {
                console.error(err)
            })

        },
        removeTask(taskId) {
            const taskIndex = this.$store.state.tasks.findIndex(task => task.id === taskId);
            console.log(taskIndex);
            this.$store.state.tasks.splice(taskIndex, 1);
        } 
    }
}

</script>

