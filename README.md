# demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


图书管理系统项目

启动前端vue

    cd demo
    npm run serve    (http://127.0.0.1:8080)

启动后端node服务

    cd demo/src/serve
    node app.js  或  nodemon app.js      (http://127.0.0.1:80)



项目结构

1. src
    1. assets
        1. css
            1. start.css（页面初始化css）
        2. js
            1. jquery.min.js（未使用）
    2. components(vue组件)
        1. Client（用户界面的组件）
            1. Books.vue（借阅图书的组件）
            2. Personal.vue（用户中心组件）
        2. System（管理员界面的组件）
            1. BooksManager.vue（书籍管理）
            2. Bookstype.vue（书籍类型管理）
            3. ReadManager.vue（借阅管理）
            4. Userinfo.vue（用户信息管理）
        3. ClientInterface.vue（用户界面）
        4. eventBus.js（用于兄弟组件之间传递数据）
        5. Home.vue（管理员的home界面）
        6. Login.vue（登陆界面）
        7. UserInterface.vue（管理员界面）
    3. router（vue-router页面的跳转，以及路由器前置守卫）
        1. allurl
        2. index.js（页面跳转，路由前置守卫）
    4. server（node后端的代码）
        1. API
            1. router
                1. index.js（后端api接口，以及数据库的增删改查）
        2. db（数据库）
            1. index.js（node连接数据库）
        3. app.js（启动node服务）
        4. config.js（token的加密和解析）
    5. app.vue
    6. main.js

