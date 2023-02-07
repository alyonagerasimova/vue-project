<template>
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <input
        class="post-input"
        placeholder="Название"
        type="text"
        v-model="post.title"/>
    <input
        class="post-input"
        placeholder="Описание"
        type="text"
        v-model="post.body"/>
    <my-button
        style="margin-top: 15px; align-self: flex-end"
    >
      Создать
    </my-button>
  </form>
</template>

<script>
export default {
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

.post-input {
  width: 100%;
  border: 1px darkgreen solid;
  padding: 10px 15px;
  margin-top: 15px;
}

</style>
