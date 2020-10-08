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

// 文章列表 接口
router.get('/articleList/:page', (req, res) => {
  let page = req.params.page;
  let start = (page-1)*10;
  // let sql = "select aid, title, date, sort, author from article";
  let sql = "select aid, title, date, author, sort, cover, content from article order by aid desc limit " + start + ",10;";
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

// 文章数量 接口
router.get('/articleCount', (req, res) => {
  let sql = "select count(*) as count from article";
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

// 查询文章 接口
router.get('/selArticle', (req, res) => {
  // console.log(req.query.selId);
  let id = req.query.selId;
  let sql = 'select * from article where aid ="' + id +'"';
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

// 添加文章 接口
router.post('/addArticle', (req, res) => {
  let sql = 'insert into article(aid, title, date, author, sort, cover, content) values(?,?,?,?,?,?,?)';
  let data = req.body;
  let time = (new Date()).getTime();
  // console.log(req.body);
  conn.query(sql, [time, data.title, data.date, data.author, data.sort, data.cover, data.content], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      return res.json({ status: 1, msg: '添加成功' })
    }
  })
});

// 删除文章 接口
router.post('/delArticle', (req, res) => {
  // console.log(req.body);
  let aid = req.body._aid;
  let sql = 'delete from article where aid="' + aid + '"';
  conn.query(sql, aid, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      return res.json({ status: 1, msg: '删除成功' })
    }
  })
});

// 修改文章信息 接口
router.post('/updateArticle', (req, res) => {
  // console.log(req.body);
  let data = req.body;
  let sql = 'update article set title="'+ data.title +'", author="' + data.author + '" , date="'+ data.date + '", sort="' + data.sort + '", content="' + data.content +'" where aid="'+ data.id + '"';
  conn.query(sql, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      return res.json({ status: 1, msg: '修改成功' })
    }
  })
});

module.exports = router;
