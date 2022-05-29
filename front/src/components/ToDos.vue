<template>
  <AddTask></AddTask>
  <base-card>
    <base-button
      @click="setSelectedTab('StoredTasks')"
      :mode="addTaskButtonMode"
      >All</base-button
    >
    <base-button @click="setSelectedTab('Todo')">Todo</base-button>
    <base-button @click="setSelectedTab('Done')">Done</base-button>
  </base-card>
  <component @toParent="childStoredTasks" :is="selectedTab"></component>
</template>

<script>
import StoredTasks from './StoredTasks.vue'
import AddTask from './AddTask.vue';
import axios from 'axios'

export default {
    components: {
    StoredTasks,
    AddTask
    },
    inject: ['getTasks'],
    data() {
        return {
            selectedTab: 'StoredTasks',
            tasks : []
        }
    },
    provide() {
        return {
            tasks: this.tasks,
            addTask: this.addTask,
            removeTask: this.removeTask
        };
    },
/*     created() {
        this.getTasks();
        console.log(this.tasks)

    }, */
    methods: {
        setSelectedTab(tab) {
            this.selectedTab = tab;
        },
        addTask(taskDescription) {

            const backPath = "http://127.0.0.1:5050/create";

            const newTask = {
                description: taskDescription
            };
            const headers = {
                'Content-type':'application/json',
                'Accept': 'application/json',
                
            }
            axios.post(backPath,newTask,{
                headers:headers
            });
            this.$store.state.tasks.unshift(newTask);
            },

        },
        computed: {
            addTaskButtonMode() {
                return this.selectedTab ==='StoredTasks' ? null : 'flat'
            },
    }
}
</script>
