<template>
  <div v-if="posts.length > 0">
    <h3>Список постов</h3>
    <transition-group name="post_list">
      <post-item
          v-for="post in posts"
          :post="post"
          :key="post.id"
          @remove="$emit('remove', post)"
      />
    </transition-group>

  </div>
  <h2 v-else style="color: red">
    Список постов пуст
  </h2>
</template>

<script>
import PostItem from "@/components/PostItem";

export default {
  components: {PostItem},
  props: {
    posts: {
      type: Array,
      required: true
    },
  }
}
</script>

<style scoped>
.post_list-enter-active,
.post_list-leave-active {
  transition: all 0.5s ease;
}
.post_list-enter-from,
.post_list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.post_list-move {
  transition: transform 0.5s ease;
}
</style>