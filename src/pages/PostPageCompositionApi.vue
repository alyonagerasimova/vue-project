<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
        v-focus
        placeholder="Поиск"
        v-model="searchQuery"
    />
    <div class="app_btns">
<!--      <my-button-->
<!--          @click="showDialog"-->
<!--      >-->
<!--        Создать пост-->
<!--      </my-button>-->

      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      />
    </div>
<!--    <my-dialog v-model:show="dialogIsVisible">-->
<!--      <post-form-->
<!--          @create="createPost"-->
<!--      />-->
<!--    </my-dialog>-->

    <post-list v-if="!isPostLoading"
               :posts="sortedAndSearchPosts"

    />
    <div v-else>Идет загрузка...</div>
<!--    <div v-intersection="loadMorePosts" class="observer"></div>-->
  </div>
</template>

<script>
import PostList from "@/components/PostList";
import PostForm from "@/components/PostForm";
import axios from "axios";
import MyInput from "@/components/UI/MyInput";
import {usePosts} from "@/hooks/usePosts";
import {useSortedPosts} from "@/hooks/useSortedPosts";
import {useSortedAndSearchPosts} from "@/hooks/useSortedAndSearchPosts";

export default {
  components: {MyInput, PostForm, PostList},
  data() {
    return {
      dialogIsVisible: false,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По содержимому'}
      ]
    }
  },
  setup(props) {
    const {posts, totalPages, isPostLoading} = usePosts(10);
    const {selectedSort, sortedPosts} = useSortedPosts(posts);
    const {searchQuery, sortedAndSearchPosts} = useSortedAndSearchPosts(sortedPosts);
    return {
      posts,
      totalPages,
      isPostLoading,
      selectedSort,
      sortedPosts,
      searchQuery,
      sortedAndSearchPosts
    }
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
</style>

