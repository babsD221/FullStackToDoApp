<template>
    <button :class="mode" class="btn text-white py-3 px-6 bg-[#3a0061] cursor-pointer">
      <slot></slot>
    </button>
</template>

<script>
export default {
  props: ['mode']
}
</script>

<style scoped>

.btn {
    border: 1px solid #3a0061;
}

button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
}

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.flat:hover,
.flat:active {
  background-color: #edd2ff;
}
</style>