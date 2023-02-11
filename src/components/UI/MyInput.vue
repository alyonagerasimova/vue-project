<template>
  <input class="input" type="text" :value="modelValue" @input="updateValue">
</template>

<script>
export default {
  name: "my-input",
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateValue(event){
      this.$emit("update:modelValue", event.target.value)
    }
  }
}
</script>

<style scoped>
.input {
  width: 100%;
  border: 1px darkblue solid;
  padding: 10px 15px;
  margin-top: 15px;
}
</style>