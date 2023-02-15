import Main from "@/pages/Main";
import {createRouter, createWebHistory} from "vue-router/dist/vue-router";
import PostPage from "@/pages/PostPage";
import About from "@/pages/About";
import PostItemPage from "@/pages/PostItemPage";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        component: PostItemPage
    },
];

const router = createRouter({
    routes,
    history: createWebHistory()
});

export default router;