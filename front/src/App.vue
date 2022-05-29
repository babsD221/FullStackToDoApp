<template>
  <Header></Header>
<!--   <UserAuth></UserAuth>
 -->  <router-view></router-view>
<!--   <ToDos ></ToDos>
 -->
</template>

<script>
import Header from './components/Header.vue'
/* import UserAuth from './components/UserAuth.vue';
 */export default {
  name: 'App',
  components: {
    Header
},
data() {
 return {

 };
}
}
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}
#app {

}
</style>
