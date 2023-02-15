<template>
  <div >
    <h1>Страница с постами</h1>
    <my-input
        v-focus
        placeholder="Поиск"
        v-model="searchQuery"
    />
    <div class="app_btns">
      <my-button
          @click="showDialog"
      >
        Создать пост
      </my-button>

      <my-select
          v-model="selectedSort"
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
    <!--    <div class="page__wrapper">-->
    <!--      <div-->
    <!--          v-for="pageNum in totalPages"-->
    <!--          key="pageNum"-->
    <!--          class="page"-->
    <!--          :class="{-->
    <!--             'current-page': pageNum === page-->
    <!--       }"-->
    <!--      @click="changePage(pageNum)">-->
    <!--        {{ pageNum }}-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import PostList from "@/components/PostList";
import PostForm from "@/components/PostForm";
import axios from "axios";
import MyInput from "@/components/UI/MyInput";

export default {
  components: {MyInput, PostForm, PostList},
  data() {
    return {
      posts: [],
      dialogIsVisible: false,
      isPostLoading: true,
      selectedSort: '',
      searchQuery: '',
      limit: 10,
      page: 1,
      totalPages: 1,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По содержимому'}
      ]
    }
  },
  methods: {
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
    async fetchPosts() {
      try {
        this.isPostLoading = true;
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts?", {
          params: {
            _limit: this.limit,
            _page: this.page,
          }
        });
        this.totalPages = Math.ceil(response.headers["x-total-count"] / this.limit);
        this.posts = response.data;
      } catch (e) {
        alert("Ошибка! " + e);
      } finally {
        this.isPostLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts?", {
          params: {
            _limit: this.limit,
            _page: this.page,
          }
        });
        this.totalPages = Math.ceil(response.headers["x-total-count"] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert("Ошибка! " + e);
      }
    }
    // changePage(pageNum){
    //   this.page = pageNum;
    // }
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]);
      });
    },
    sortedAndSearchPosts() {
      return this.sortedPosts.filter(p => p.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
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

