<template>
    <form  @submit.prevent="submitForm" class="m-4 rounded-xl p-4 flex flex-col" action="">
        <base-card>
            <label for="email">E-Mail</label>
            <input type="email" id="email" v-model.trim="email">
        </base-card>
                <base-card>
            <label for="password">Password</label>
            <input type="password" id="password" v-model.trim="password">
        </base-card>
        <p v-if="!formIsValid"> Please enter a valid email and password</p>
        <base-card>
        <base-button type="submit">{{submitButtonCaption}}</base-button>
        <base-button type="button" @click="SwithAuthMode" mode="flat">{{SwitchModeButtonCaption}}</base-button>
        </base-card>

    </form>
</template>

<script>

export default {
    data() {
        return {
            email:'',
            password:'',
            formIsValid: true,
            mode:'login',
            error: null
        }
    },
    computed: {
        submitButtonCaption() {
            if(this.mode === 'login') {
                return 'Login';
            }
            else {
                return 'SignUp';
            }
        },
        SwitchModeButtonCaption() {
            if(this.mode === 'login') {
                return 'SignUp instead';
            }
            else {
                return 'Login instead';
            }
        }
    },
    methods: {
        submitForm() {
            console.log("Form submitted");
            console.log(this.email.includes('@'));
            console.log(this.email);
            console.log(this.mode);
            console.log(this.password.length <6);
            if(this.email ==='' || !this.email.includes('@') || this.password.length <6) {
                console.log("Form failed");
                this.formIsValid = false;
                return;
            }
            const payload = {
                    email:this.email,
                    password:this.password
            }
            try {
                if(this.mode == 'signup') {

                    this.$store.dispatch("authentication/signup",payload)
                }
            else {
                    this.$store.dispatch("authentication/authenticate",payload);
                }
                this.$router.replace('/tasks');
            }
            catch(err) {
                this.error =err.message
            }

            // send http request
        },
        SwithAuthMode() {
            if(this.mode === 'login') {
                this.mode = 'signup'
            }
            else {
                this.mode = 'login';
            }
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