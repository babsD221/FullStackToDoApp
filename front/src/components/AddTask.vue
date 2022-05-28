<template>
    <base-card>
        <form @submit.prevent="submitTask()" action="">
            <div class=" flex flex-row justify-between items-center  ">
                <label class="font-bold block mb-2 text-xl" for="description" >Description</label>
                <input class="block w-2/3" id="description" name="description" ref="taskInput" type="text">
                <base-button type="submit">Add Task</base-button>
            </div>

        </form>
    </base-card>
</template>

<script>
/* import axios from 'axios'
 */    export default {
        inject: ["tasks","getTasks"],

        methods: {
            submitTask() {
                const enteredTask = this.$refs.taskInput.value;
                this.$emit("add-task",enteredTask)
            }
        }
    }
</script>

<style scoped>
input,
textarea {
  font: inherit;
  padding: 0.15rem;
  border: 1px solid #ccc;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3a0061;
  background-color: #f7ebff;
}
</style>