<template>

    <div class=" w-2/5 h-20 bg-white m-auto rounded-3xl justify-center flex flex-row mb-10 ">
        <h3>{{ task.details }}</h3>
    </div>
        </template>


<script>
import CancelIcon from '/home/babs/Projects/FullStackToDoApp/front/src/assets/cancel.svg'
export default {
  data() {
    return {
      taskIsDone: false,
      task: {
        details: "Birane grandira dans un bon environnement",
        date: "",
      },
      components: {
          CancelIcon,
      }
    };
  },

  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.task_card {
    height:100px;
    width: 700px;
    margin:auto;
    text-align: center;
    background-color: #fff;
    border-radius: 25px;
}
.cancel-icon {
    color:red;
}
</style>