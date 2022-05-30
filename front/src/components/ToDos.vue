<template>
  <AddTask></AddTask>
  <base-card>
    <base-button
      @click="showStoredTasks()"
      :mode="addTaskButtonMode"
      >All</base-button
    >
    <base-button  @click="setSelectedTab('ActiveTasks')">Active</base-button>
    <base-button  @click="setSelectedTab('Completed')">Done</base-button>
  </base-card>
  <component @toParent="childStoredTasks" :is="selectedTab"></component>
</template>

<script>
import StoredTasks from './StoredTasks.vue';
import AddTask from './AddTask.vue';
import Completed from './Completed.vue';
import ActiveTasks from './ActiveTasks.vue';
export default {
    components: {
    StoredTasks,
    AddTask,
    Completed,
    ActiveTasks
    },
    data() {
        return {
            selectedTab: 'StoredTasks',
            tasks : []
        }
    },
    methods: {
        setSelectedTab(tab) {
            this.selectedTab = tab;
        },
        getTasks() {
            this.$store.dispatch('getTasks');
        },
        showStoredTasks() {
            this.setSelectedTab('StoredTasks');
            this.getTasks();
        }
    },
        computed: {
            addTaskButtonMode() {
                return this.selectedTab ==='StoredTasks' ? null : 'flat'
            },
    }
}
</script>
