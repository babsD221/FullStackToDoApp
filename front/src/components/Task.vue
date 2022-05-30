<template>

    <li class="m-auto">
      <base-card>
        <div class="flex justify-between  flex-row">
          <div>
              <h3 class="text-xl text-left my-2 mx-0  ">{{ description }}</h3>
          </div>
          <div class="flex flex-row justify-self-start space-x-0">
            <base-button @click="completeTask(id)"  mode="flat">
            <done-icon> </done-icon>
            </base-button>

            <base-button  @click="removeTask(id)" mode="flat">
            <delete-icon class="text-red-700">  </delete-icon>
            </base-button>
          </div>


        </div>
      </base-card>
    </li>
</template>


<script>
export default {
    name: "MyTask",
    props: ["id","description"],
    data() {
      return {

      }
    },
    methods: {
      removeTask(taskId) {
        const payload = {
          'id': taskId,
          'token': localStorage.getItem('token')
        }
        this.$store.commit('tasksList/removeTask',payload);
      },
       completeTask(taskId) {
        const payload = {
          'id': taskId,
          'token': localStorage.getItem('token')
        }
        this.$store.commit('tasksList/completeTask',payload)
      }
    },
   

    
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