import Vue from 'vue'
import VueRouter from 'vue-router'
import UserInterface from "@/components/UserInterface";
import Login from "@/components/Login";
import Userinfo from "@/components/System/Userinfo";
import Bookstype from "@/components/System/Bookstype";
import BooksManager from "@/components/System/BooksManager";
import ReadManager from "@/components/System/ReadManager";
import Home from "@/components/Home";
import ClientInterface from "@/components/ClientInterface";
import Personal from "@/components/Client/Personal";
import Books from "@/components/Client/Books";
import allUrl from "@/router/allurl";

Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
        {path: '/login', component: Login},
        {path: '/', redirect: '/login'},
        {
            path: '/userInterface', component: UserInterface,
            children: [
                {path: 'home', component: Home},
                {path: 'userinfo', component: Userinfo},
                {path: 'bookstype', component: Bookstype},
                {path: 'booksManager', component: BooksManager},
                {path: 'readManager', component: ReadManager}
            ]
        },
        {
            path: '/clientInterface', component: ClientInterface,
            redirect:'/clientInterface/personal',
            children: [
                {path: 'personal', component: Personal},
                {path: 'books', component: Books}
            ]
        },
    ]
})

/*  路由前置守卫   */
router.beforeEach((to, from, next) => {
    if (allUrl.indexOf(to.path)>=0) {
        const token = localStorage.getItem('token');
        if (token) {
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }
})


export default router
