<template>
  <div>
    <h1> Страница с постами </h1>
    <my-input
        v-focus
        placeholder="Поиск"
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
    />
    <div class="app_btns">
      <my-button
          @click="showDialog"
      >
        Создать пост
      </my-button>

      <my-select
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
          :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogIsVisible">
      <post-form
          @create="createPost"
      />
    </my-dialog>

    <post-list v-if="!isPostLoading"
               :posts="sortedAndSearchPosts"
               @remove="removePost"
    />
    <div v-else>Идет загрузка...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<script>
import PostList from "@/components/PostList";
import PostForm from "@/components/PostForm";
import MyInput from "@/components/UI/MyInput";
import {mapState, mapMutations, mapActions, mapGetters} from "vuex";

export default {
  components: {MyInput, PostForm, PostList},
  data() {
    return {
      dialogIsVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort'
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts',
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogIsVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id);
    },
    showDialog() {
      this.dialogIsVisible = true;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostLoading: state => state.post.isPostLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      limit: state => state.post.limit,
      page: state => state.post.page,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchPosts: 'post/sortedAndSearchPosts'
    })
  },
  watch: {
    // page() {
    //   this.fetchPosts();
    // }
  }
}
</script>

<style scoped>


.app_btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  margin: 15px 0;
}

.page {
  border: 1px #858585 solid;
  padding: 10px 10px;
}

.current-page {
  border: 2px green solid;
}

/**/
/*.observer{
/*  height: 30px;*/
/*  background-color: darkblue;*/
/*}
/**/
</style>

