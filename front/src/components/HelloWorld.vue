<template>
  <li>{{friend.name}}</li>
  <button @click="toggleDetails">{{ detailsAreVisible ? 'Hide': 'Show'}} Details</button>
  <ul v-if="detailsAreVisible">
    <li>
      <strong>Phone:</strong>
      {{ friend.phone }}
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      detailsAreVisible: false,
      friend: {
        name: "Birane",
        phone: "+221771586547",
        email: "biraneBoly@gmail.com"
      }
    };
  },
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    }
  },
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
