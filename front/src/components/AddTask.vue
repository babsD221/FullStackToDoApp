<template>
    <base-card>
        <form ref="taskForm" @submit.prevent="submitTask(this.$refs.taskInput.value)" action="">
            <div class=" flex flex-row justify-between items-center  ">
                <label class="font-bold block mb-2 text-xl" for="description" >Description</label>
                <input class="block w-2/3" id="description" name="description" ref="taskInput" type="text">
                <base-button type="submit">Add Task</base-button>
            </div>

        </form>
    </base-card>
</template>

<script>
export default {
    methods: {
        submitTask(description) {
            const payload = {
                'id': this.$store.getters['tasksList/tasks'].length,
                'description': description,
                'completed': false,
                'token': localStorage.getItem('token')
            }
            this.$store.dispatch('tasksList/addTask',payload);
            this.$refs.taskForm.reset()
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