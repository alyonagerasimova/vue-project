<template>
  <button
      class="btn"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "my-button"
}
</script>

<style scoped>
.btn {
  background: none;
  color: darkblue;
  padding: 10px 15px;
  border: 1px darkblue solid;
}
</style>