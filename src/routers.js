import HomePage from "./views/HomePage.vue";
import { createRouter,createWebHistory } from 'vue-router';
import ChatPage from "./views/ChatPage.vue";
import NotFound from "./components/NotFound.vue";

const routes = [
    {
        name : "HomePage",
        component: HomePage,
        path:'/'
    },
    
    {
        path: "/ChatPage",
        name: "ChatPage",
        component: ChatPage, 
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound,
    },

    
];

const router = createRouter({
    history:createWebHistory(),
    routes,
});

export default router;