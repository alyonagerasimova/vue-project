<template>
  <div class="app">
    <post-form
        @create="createPost"
    />
    <post-list
        :posts="posts"
    />
  </div>
</template>

<script>
import PostList from "@/components/PostList";
import PostForm from "@/components/PostForm";

export default {
  components: {PostForm, PostList},
  data() {
    return {
      posts: [
        {id: 1, title: "Javascript 1", body: "Описание поста 1"},
        {id: 2, title: "Javascript 2", body: "Описание поста 2"},
        {id: 3, title: "Javascript 3", body: "Описание поста 3"},
      ]
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  margin-top: 15px;
}


</style>

