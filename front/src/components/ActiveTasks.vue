<template>
      <ul class=" p-0 m-auto max-w-md">
    <Task :class="{'completed': task.completed}"  v-for="task in tasks" :key="task.id" :id="task.id"  :description="task.description" />
  </ul>
</template>

<script>
import Task from './Task.vue'
/* import axios from 'axios'
 */
export default {
  name: 'ActiveTasks',
  components: {
    Task
    },
    data() {
        return {
            token: this.$store.getters['authentication/token']
        }
    },
    computed: {
        tasks: function() {
            let activeTasks =this.$store.getters['tasksList/tasks'].filter(task => task.completed==false);
            return activeTasks;
        },

         
    },
}

</script>

<style scoped>

</style>