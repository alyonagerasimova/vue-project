<template>
  <div class="post">
    <div>
      <div><strong>Название поста: </strong> {{ post.title }}</div>
      <div><strong>Описание: </strong>{{ post.body }}</div>
    </div>
    <div class="post-btns">
      <my-button
          @click="$emit('remove', post)"
      >
        Удалить
      </my-button>
    </div>
  </div>

</template>

<script>

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }

}
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px darkblue solid;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}

.post-btns {

}
</style>