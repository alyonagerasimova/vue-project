import {computed, ref} from "vue";

export function useSortedAndSearchPosts(sortedPosts){
    const searchQuery = ref('');
    const sortedAndSearchPosts = computed(() => {
            return sortedPosts.value.filter(p => p.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
        }
    );
    return {
        searchQuery, sortedAndSearchPosts
    }
}