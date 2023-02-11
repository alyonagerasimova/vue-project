<template>
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <my-input
        placeholder="Название"
        type="text"
        v-model="post.title"/>
    <my-input
        placeholder="Описание"
        type="text"
        v-model="post.body"/>
    <my-button
        style="margin-top: 15px; align-self: flex-end"
        @click="createPost"
    >
      Создать
    </my-button>
  </form>
</template>

<script>
import MyInput from "@/components/UI/MyInput";
export default {
  components: {MyInput},
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost(){
      this.post.id = Date.now();
      this.$emit('create', this.post);
      this.post = {
        title: '',
        body: ''
      }

    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

</style>
