<template>
  <div class="post">
    <div>
      <div>{{ post.id }}</div>
      <div><strong>Название поста: </strong> {{ post.title }}</div>
      <div><strong>Описание: </strong>{{ post.body }}</div>
    </div>
    <div class="post-btns">
      <my-button
          @click="$router.push('/posts/'+post.id)"
          style="margin-right: 5px"
      >
        Открыть
      </my-button>
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
  align-items: center;
}

.post-btns {
  display: flex;
  margin-left: 5px;
}
</style>