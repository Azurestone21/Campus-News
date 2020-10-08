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
router.get('/articleList', (req, res) => {
  let sql = "select aid, title, date, author, sort, cover, content from article";
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
router.get('/articleCount/:sort', (req, res) => {
  let sort = req.params.sort;
  // console.log(sort);
  let sql = "select count(*) as count from article where sort='"+ sort + "'";
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

// 更多文章列表 接口
router.get('/articleList/:sort/:page', (req, res) => {
  let sort = req.params.sort;
  let page = req.params.page;
  let start = (page-1)*10;
  // console.log(page);
  let sql = "select aid, title, date, author, sort, cover, content from article where sort='" + sort + "' limit " + start + ",10;";
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

// 搜索文章 接口
router.get('/searchList/:searchInfo', (req, res) => {
  let searchInfo = req.params.searchInfo;
  let sql = "select aid, title, date, author, sort, cover, content from article where title like '%" + searchInfo + "%'";
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

// 文章详情 接口
router.get('/notice/:id', (req, res) => {
  // console.log(req.params.id);
  let aid = req.params.id;
  let sql = "select title, date, author, sort, cover, content from article where aid='" + aid + "'";
  conn.query(sql,(err, result) => {
    if (err) {
      console.log(err);
    }
    if (result) {
      // console.log(result);
      res.json(result);
    }
  })
});

// 文章评论 接口
router.get('/comment/:id', (req, res) => {
  // console.log(req.params.id);
  let aid = req.params.id;
  let sql = "select content,author,date from comment where articleId='" + aid + "' order by cid desc";
  conn.query(sql,(err, result) => {
    if (err) {
      console.log(err);
    }
    if (result) {
      // console.log(result);
      res.json(result);
    }
  })
});

// 提交评论 接口
router.post('/addComment', (req, res) => {
  let sql = 'insert into comment(cid, articleId, content, author, date) values(?,?,?,?,?)';
  // console.log(req.body);
  let data = req.body;
  let time = (new Date()).getTime();
  // console.log(data);
  conn.query(sql, [time, data.articleId, data.content, data.author, data.date], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      return res.json({ status: 1, msg: '添加成功' })
    }
  })
});

module.exports = router;
