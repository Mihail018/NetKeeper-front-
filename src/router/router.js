import AutoAddPage from "@/pages/AutoAddPage.vue";
import DeleteDevicePage from "@/pages/DeleteDevicePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import MainPage from "@/pages/MainPage.vue";
import RegistrationPage from "@/pages/RegistrationPage.vue";
import ShowDevicePage from "@/pages/ShowDevicePage.vue";
import UpdateDevicePage from "@/pages/UpdateDevicePage.vue";
import AboutPage from "@/pages/AboutPage.vue";
import ReferenceMaterialsPage from "@/pages/ReferenceMaterialsPage.vue"
import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";

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
    },
    {
        path: '/registration',
        component: RegistrationPage
    },
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/about',
        component: AboutPage
    },
    {
        path: '/referenceMaterials',
        component: ReferenceMaterialsPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
    // Для возвращения в наивысшую точку окна при переходе на другую страницу 
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
            };
        }
        return { top: 0 };
    }
});

// Security

// Список маршрутов, доступных без авторизации
const publicPages = ['/', '/login', '/registration', '/about', '/referenceMaterials'];

// Навигационный guard
router.beforeEach(async (to, from, next) => {
    const authRequired = !publicPages.includes(to.path);

    if (!authRequired) {
        return next(); // Разрешено без авторизации
    }

    try {
        // Проверка: есть ли активная сессия
        await axios.get('/api/auth/user/me');
        next(); // Авторизован
    } 
    catch (error) {
        // Запоминаем страницу, на которую кликнул пользователь
        next({ path: '/login', query: { redirect: to.fullPath } }); // Не авторизован — редирект на логин
    }
});

export default router;