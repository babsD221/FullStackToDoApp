<template>
      <ul class=" p-0 m-auto max-w-md">
    <Task :class="{'completed': task.completed}"  v-for="task in tasks" :key="task.id" :id="task.id"  :description="task.description" />
  </ul>
</template>

<script>
import Task from './Task.vue'
export default {
  name: 'CompletedTask',
  components: {
    Task
    },
    computed: {
        tasks: function() {
            let completedTasks =this.$store.getters['tasksList/tasks'].filter(task => task.completed==true);
            return completedTasks;
        },

         
    },
    mounted() {
    }
}

</script>

<style scoped>
.completed {
    text-decoration:line-through;
}
</style>