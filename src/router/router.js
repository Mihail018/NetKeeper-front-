import SearchIcon from "@/components/UI/LucideIcons/SearchIcon.vue";
import AutoAddPage from "@/pages/AutoAddPage.vue";
import DeleteDevicePage from "@/pages/DeleteDevicePage.vue";
import MainPage from "@/pages/MainPage.vue";
import ShowDevicePage from "@/pages/ShowDevicePage.vue";
import UpdateDevicePage from "@/pages/UpdateDevicePage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/autoAdd',
        component: AutoAddPage
    },
    {
        path: '/data',
        component: ShowDevicePage
    },
    {
        path: '/updateData',
        component: UpdateDevicePage
    },
    {
        path: '/deleteData',
        component: DeleteDevicePage 
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;