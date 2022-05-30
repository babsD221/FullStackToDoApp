<template>
      <ul class=" p-0 m-auto max-w-md">
    <Task :class="{'completed': task.completed}"  v-for="task in tasks" :key="task.id" :id="task.id"  :description="task.description" />
  </ul>
</template>

<script>
import Task from './Task.vue'
export default {
  name: 'StoredTasks',
  components: {
    Task
    },

/*     created() {
        this.$store.commit('tasksList/removeAllTasks');
        this.getTasks();
    }, */
    computed: {
        tasks: function() {
            return this.$store.getters['tasksList/tasks'];
        }         
    },
    methods: {
        getTasks() {
            this.$store.dispatch('getTasks')
            setTimeout(() => this.$store.dispatch('getTasks'), 300);
        }
    }
}
</script>

<style scoped>
.completed {
    text-decoration:line-through;
}
</style>