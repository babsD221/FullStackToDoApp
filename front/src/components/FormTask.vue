<template>

    <form class="w-2/5 flex m-auto mb-4">
        <input class="appearance-none bg-beige border-b-8 w-full text-gray-800 mr-3 py-2 leading-tight focus:outline-none" type="text">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create</button>
    </form>
        </template>


<script>
export default {
  data() {
    return {

      };
    },
  name: 'FormTask',
  props: {
    msg: String
  }
}
</script>

<style scoped>

</style>