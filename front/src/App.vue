<template>
<FormTask />
  <Task  msg="Welcome to Your Vue.js App"/>
  <Task  msg="Welcome to Your Vue.js App"/>
  <Task  msg="Welcome to Your Vue.js App"/>

</template>

<script>
import Task from './components/Task.vue'
import FormTask from './components/FormTask.vue'

export default {
  name: 'App',
  components: {
    Task,
    FormTask
}
}
</script>

<style>
body {
    background-color: whitesmoke;

}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
