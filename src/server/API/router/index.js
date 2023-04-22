const express = require('express');
const db = require('../../db/index');
const jsonwebtoken = require('jsonwebtoken');
const config = require("../../config");
const router = express.Router();

/*     login   */
router.get('/login', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const query = req.query;
    console.log(query)
    const sql = 'select * from tb_user where user="' + query.user +
        '" and passwd=' + query.passwd
    db.query(sql, (err, results) => {
        if (err) return res.send(err)

        /*  生成token密钥   */
        const tokenStr = {...results[0], user: '', passwd: ''}
        /*  对用户信息进行加密生成token密钥*/
        const token = jsonwebtoken.sign(tokenStr,
            config.jwtSecretKey,
            {expiresIn: config.expiresIn});

        res.send({
            status: 0,
            data: results,
            token: 'bearer ' + token
        })
    })
})
/*     register  */
router.post('/register', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const body = req.body;
    const sql = `insert into tb_user set ?`
    db.query(sql, {user: body.user, passwd: body.passwd}, (err, results) => {
        if (err) return res.send(err)
        res.send({
            status: 0,
            message: '用户创建成功'
        })
    })
})


/*    personal用户中心    */
router.get('/personal', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const sql = `select * from tb_user where ?`
    const query = req.query;
    db.query(sql, {user: query.user}, (err, results) => {
        if (err) return res.send(err)
        res.send({
            status: 0,
            data: results
        })
    })
})
router.get('/personal/getmsg', (req, res) => {
    const query = req.query;
    const sql = `SELECT tb_books.book_name,tb_user_book.begin_time,
tb_user_book.end_time,tb_user_book.book_id from tb_books,tb_user_book,tb_user WHERE 
tb_user_book.book_id = tb_books.ID and tb_user.id = tb_user_book.user_id 
and tb_user_book.stat = 1 and tb_user.id = ` + query.id
    db.query(sql, (err, results) => {
        console.log(results);
        if (err) return res.send(err)
        res.send({
            status: 0,
            data: results
        })
    })
})
router.post('/personal/returnbooks', (req, res) => {
    const body = req.body;
    const sql = `update tb_user_book set stat = 0 where  ? 
    and book_id = ` + body.book_id

    db.query(sql, {user_id: body.user_id}, (err, results) => {
        if (err) return res.send(err)
        res.send({
            status: 0,
            message: '修改数据成功'
        })
    })
})
router.get('/personal/updatepasswd', (req, res) => {
    const query = req.query;
    const sql = `update tb_user set ? where id = ` + query.id
    db.query(sql, {passwd: query.passwd}, (err, results) => {
        if (err) res.send(err)
        res.send({
            status: 0,
            message: '密码修改成功'
        })
    })
})
/*  books 书籍中心  */
router.post('/books/borrowbooks', (req, res) => {
    const body = req.body;
    const sql = `insert into tb_user_book values (null,'` + body.user_id + `','` + body.book_id + `','` + body.begin_time.split('T')[0] + `','` + body.end_time.split('T')[0] + `',1)`
    db.query(sql, (err, results) => {
        if (err) return res.send(err)
        res.send({
            status: 0,
            message: '借阅成功'
        })
    })

})


/*     书籍类型管理   API      */
/*    获取图书类型列表   */
router.get('/getbookstype', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    const sql = `select * from tb_books_type`
    db.query(sql, (err, resault) => {
        if (err) return res.send(err)
        res.send({
            status: 0,
            data: resault
        })
    })
})
/*    获取图书类型列表分页   */
router.get('/getbookstype/limit', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")

    const query = req.query;
    const size = parseInt(query.pageSize)
    var num = parseInt(query.pageNum)
    num = (num - 1) * size
    const sql = `select * from tb_books_type limit ?,?`
    db.query(sql, [num, size], (err, resault) => {
        if (err) return res.send(err)
        res.send({
            status: 0,
            data: resault
        })
    })
})
/*  添加图书类型   */
router.post('/addbookstype', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    console.log(req)
    const body = req.body;
    const sql = 'insert into tb_books_type set ?'
    db.query(sql, {type: body.type, type_max_num: body.type_max_num}, (err, results) => {
        if (err) return res.send(err)
        res.send({
            status: 0,
            message: '图书类型添加成功'
        })
    })
})


/*     用户信息管理   API  fff  */
/*  获取用户信息   */
router.get('/getuserinfo', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    const sql = `select * from tb_user`
    db.query(sql, (err, resault) => {
        if (err) return res.send(err)
        res.send({
            status: 0,
            data: resault
        })
    })
})
/*   获取用户信息列表的分页  */
router.get('/getuserinfo/limit',
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*")

        const query = req.query;
        const size = parseInt(query.pageSize)
        var num = parseInt(query.pageNum)
        num = (num - 1) * size
        const sql = `select * from tb_user limit ?,?`
        db.query(sql, [num, size], (err, resault) => {
            if (err) return res.send(err)
            res.send({
                status: 0,
                data: resault
            })
        })
    })
/*  添加用户信息   */
router.post('/adduserinfo', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    const body = req.body;
    const sql = 'insert into tb_user set ?'
    db.query(sql, {user: body.user, passwd: body.passwd}, (err, results) => {
        if (err) return res.send(err)
        res.send({
            status: 0,
            message: '用户信息添加成功'
        })
    })
})
/*   修改用户信息  */
router.post('/updateUserinfo', (req, res) => {
    const body = req.body;
    const sql = `update tb_user set ? where id=` + body.id
    db.query(sql, {user: body.user, passwd: body.passwd}, (err, results) => {
        if (err) return res.send({
            status: 1,
            message: err
        })
        res.send({
            status: 0,
            message: '用户信息修改成功'
        })
    })
})
/*  删除用户信息管理    */
router.post('/deleteUserinfo', (req, res) => {
    const body = req.body;
    const sql = `delete from tb_user where ?`
    db.query(sql, body, (err, reaults) => {
        if (err) return res.send(err)
        res.send({
            status: 0,
            message: '用户信息删除成功'
        })
    })
})


/*    书籍管理    */
/*  增加书籍*/
router.post('/addbooks', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const sql = `insert into tb_books set ?`
    const body = req.body;
    console.log(body)
    db.query(sql, body, (err, results) => {
        if (err) return res.send(err)

        res.send({
            status: 0,
            message: '用户信息添加成功'
        })
    })
})
/*  获取书籍管理的信息  */
router.get('/getbooksManager', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const sql = `select * from tb_books`
    db.query(sql, (err, results) => {
        if (err) return res.send(err)
        res.send({
            stauts: 0,
            data: results
        })
    })
})
/*   获取书籍管理信息的分页  */
router.get('/getbooksManager/limit', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const query = req.query;
    const size = parseInt(query.pageSize)
    var num = parseInt(query.pageNum)
    num = (num - 1) * size
    const sql = `select * from tb_books limit ?,?`
    db.query(sql, [num, size], (err, resault) => {
        if (err) return res.send(err)
        res.send({
            status: 0,
            data: resault
        })
    })
})


/*    借阅管理   */
router.get('/getReadmManger/limit', (req, res) => {
    const sql = `SELECT tb_user_book.id, tb_user.\`user\`,
tb_books.book_name,tb_user_book.begin_time,tb_user_book.end_time,
tb_user_book.stat from tb_user,tb_books,tb_user_book WHERE 
tb_user_book.user_id = tb_user.id and tb_books.ID = 
tb_user_book.book_id LIMIT ?,?;`
    res.header("Access-Control-Allow-Origin", "*")
    const query = req.query;
    const size = parseInt(query.pageSize)
    var num = parseInt(query.pageNum)
    num = (num - 1) * size
    db.query(sql, [num, size], (err, resault) => {
        if (err) return res.send(err)
        res.send({
            status: 0,
            data: resault
        })
    })
})


module.exports = router;