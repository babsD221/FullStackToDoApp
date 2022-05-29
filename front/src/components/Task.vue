<template>

    <li class="m-auto">
      <base-card>
        <header class="flex justify-between items-center flex-row">
        <h3 class="text-xl my-2 mx-0 ">{{ description }}</h3>
        <div>
        <base-button  mode="flat">
        <done-icon> </done-icon>
        </base-button>

        <base-button  @click="this.$store.commit('tasksList/removeTask',id)" mode="flat">
        <delete-icon class="text-red-700">  </delete-icon>
        </base-button>
        </div>

        </header>

      </base-card>
    </li>
</template>


<script>
export default {
    inject:['removeTask'],
    name: "MyTask",
    props: ["id","description"],
    components: {  }
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

.backImg {
  background-image: url("/home/babs/Projects/FullStackToDoApp/front/src/assets/done_all_FILL0_wght400_GRAD0_opsz48.png");
  height: 50px;
}
.DeleteButton {
  background-image:
  rgba(255, 99, 71),
   url("/home/babs/Projects/FullStackToDoApp/front/src/assets/delete_FILL0_wght400_GRAD0_opsz48.png");
  height: 50px;
  filter: sepia(100%);
  background-color: red;
}
.deee {
  color:red;
}
</style>