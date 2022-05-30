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
    provide() {
        return {
            tasks: this.tasks,
            addTask: this.addTask,
            removeTask: this.removeTask
        };
    },

    methods: {
        setSelectedTab(tab) {
            this.selectedTab = tab;
        },
        getTasks() {
            console.log(this.$store.getters['taskList/tasks'])
            this.$store.dispatch('getTasks');
        },
        showStoredTasks() {
            this.setSelectedTab('StoredTasks');
            this.getTasks();
        },
        showCompletedTasks() {
            this.setSelectedTab('Completed');
/*             this.$store.dispatch('getCompletedTasks');
 */        }

        },
        computed: {
            addTaskButtonMode() {
                return this.selectedTab ==='StoredTasks' ? null : 'flat'
            },

    }
}
</script>
