const express = require('express');
const app = express();
const router = require('./API/router/index');
const cors = require('cors');  // 解决浏览器的跨域问题

/*    表单解析的中间件    */
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

/*   路由登录之前解析token密钥  */
const {expressjwt} = require('express-jwt');
const config = require('./config');
app.use(expressjwt({secret:config.jwtSecretKey,algorithms:["HS256"]})
    .unless({path: ['/api/login','/api/register'] }))


app.use('/api', router)

/*  定义错误级别的中间件*/
app.use((err, req, res, next) => {
    /*  身份认证失败  */
    if (err.name === 'UnauthorizedError') return res.send({
        message:'未经授权的错误',status:1})
    /*  未知的错误*/
    res.send({message:err,status:1})
})

app.listen(80, () => {
    console.log('node server run at http://127.0.0.1:80')
})