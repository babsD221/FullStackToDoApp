<template>

    <li class="m-auto">
      <base-card>
        <header class="flex justify-between items-center flex-row">
        <h3 class="text-xl my-2 mx-0  ">{{ description }}</h3>
        <div>
        <base-button @click="completeTask(id,this.$store.getters['authentication/token'])"  mode="flat">
        <done-icon> </done-icon>
        </base-button>

        <base-button  @click="removeTask(id,this.$store.getters['authentication/userId'],this.$store.getters['authentication/token'])" mode="flat">
        <delete-icon class="text-red-700">  </delete-icon>
        </base-button>
        </div>

        </header>

      </base-card>
    </li>
</template>


<script>
export default {
    name: "MyTask",
    props: ["id","description"],
        computed :{
      jwt: function() {
        return this.$store.getters['auth/jwt'];
      }
    },
    methods: {
      removeTask(taskId,user_id,jwt) {
        const payload = {
          'id': taskId,
          'user_id':user_id,
          'token': jwt
        }
        console.log(payload)
        this.$store.commit('tasksList/removeTask',payload);
      },
       completeTask(taskId,jwt) {
        const payload = {
          'id': taskId,
          'token': jwt
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