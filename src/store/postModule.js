import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
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
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => {
                return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]);
            });
        },
        sortedAndSearchPosts(state, getters) {
            return getters.sortedPosts.filter(p => p.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setPostLoading(state, loading) {
            state.isPostLoading = loading;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setSearchQuery(state, query) {
            state.searchQuery = query;
        },
        setPage(state, page) {
            state.page = page;
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages;
        },
    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit("setPostLoading", true);
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts?", {
                    params: {
                        _limit: state.limit,
                        _page: state.page,
                    }
                });
                commit("setTotalPages", Math.ceil(response.headers["x-total-count"] / state.limit));
                commit("setPosts", response.data);
            } catch (e) {
                alert("Ошибка! " + e);
            } finally {
                commit("setPostLoading", false);
            }
        },
        async loadMorePosts({state, commit}) {
            try {
                commit("setPage", state.page + 1);
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts?", {
                    params: {
                        _limit: state.limit,
                        _page: state.page,
                    }
                });
                commit("setTotalPages", Math.ceil(response.headers["x-total-count"] / state.limit));
                commit("setPosts", [...state.posts, ...response.data]);
            } catch (e) {
                alert("Ошибка! " + e);
            }
        }
    },
    namespaced: true
}