<template>
  <Header></Header>
  <ToDos ></ToDos>

</template>

<script>
import Header from './components/Header.vue'
import ToDos from './components/ToDos.vue';
export default {
  name: 'App',
  components: {
    Header,
    ToDos
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
