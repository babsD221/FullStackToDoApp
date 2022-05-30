<template>

    <header class="w-full h-20 bg-[#640032] flex justify-center items-center">
        <div class="flex flex-row w-11/12 justify-between">
        <h1 class="text-white text-3xl p-4"> TODO App</h1>
        <base-button class="text-xl" @click="this.$store.dispatch('logout')" v-if="isLoggedIn">Logout</base-button>
        </div>
        
    </header>
</template>

<script>
export default {
    name:"HeaderComponent",

    computed: {
        isLoggedIn: function() {
            return this.$store.getters['authentication/isAuthenticated'];
        }
    },
    methods: {
    }
}
</script>
