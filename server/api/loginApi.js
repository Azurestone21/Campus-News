const db = require('../db');
const express = require('express');
const router = express.Router();
// mysql模块
const mysql = require("mysql");
// 加解密模块
const CryptoJS = require('crypto-js');

// 连接数据库
let conn = mysql.createConnection(db.mysql);
conn.connect((err) => {
  if (err) throw err;
  console.log('连接成功');
});

// 登录 接口
router.post('/userLogin', (req, res) => {
  let id = req.body.id;
  let password = req.body.password;
  // console.log(id);
  // console.log(password);
  let sql = 'select * from user where id ="'+ id +'"';
  conn.query(sql, id, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ status: 1, msg: '密码错误' })
    }
    if (result) {
      let passwd = result[0].password;
      // console.log(result[0].password);
      let bytes = CryptoJS.AES.decrypt(passwd, "123456");
      let originalText = bytes.toString(CryptoJS.enc.Utf8);
      // console.log(originalText);
      if (originalText === password) {
        return res.json({ status: 1, msg: '登录成功', result: result[0] })
      }
      return res.json({ status: 1, msg: '密码错误' })
    }
  })
});

module.exports = router;
