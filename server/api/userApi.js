const db = require('../db');
const express = require('express');
const router = express.Router();
// mysql模块
const mysql = require("mysql");

// 连接数据库
let conn = mysql.createConnection(db.mysql);
conn.connect((err) => {
  if (err) throw err;
  console.log('连接成功');
});

let jsonWrite = function(res, ret) {
  if(typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};

// 用户列表 接口
router.get('/userList/:page', (req, res) => {
  let page = req.params.page;
  let start = (page-1)*10;
  let sql = "select id,username,tel,role,status from user limit " + start + ",10;";
  conn.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result) {
      // console.log(result);
      res.json(result);
    }
  })
});

// 用户数量 接口
router.get('/userCount', (req, res) => {
  let sql = "select count(*) as count from user";
  conn.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result) {
      // console.log(result);
      res.json(result);
    }
  })
});

// 查询用户 接口
router.get('/selUser', (req, res) => {
  // console.log(req.query.selId);
  let id = req.query.selId;
  let sql = 'select * from user where id ="' + id +'"';
  conn.query(sql, id, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result) {
      // console.log(result);
      res.json(result);
    }
  })
});

// 添加用户 接口
router.post('/addUser', (req, res) => {
  let sql = 'insert into user(id, username, password, tel, role, status) values(?,?,?,?,?,?)';
  let data = req.body;
  // console.log(req.body);
  conn.query(sql, [data.id, data.username, data.password, data.tel, data.role, data.status], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

// 删除用户 接口
router.post('/delUser', (req, res) => {
  // console.log(req.body);
  let id = req.body._id;
  let sql = 'delete from user where id="' + id + '"';
  conn.query(sql, id, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

// 修改用户信息 接口
router.post('/updateUser', (req, res) => {
  // console.log(req.body);
  let data = req.body;
  let sql = 'update user set username="'+ data.username +'", password="' + data.password + '", tel="' + data.tel + '", role="' + data.role + '",status="' + data.status + '" where id="'+ data.id +'"';
  conn.query(sql, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});

module.exports = router;
