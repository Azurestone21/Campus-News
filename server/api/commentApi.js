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

// 评论列表 接口
router.get('/commentList/:page', (req, res) => {
  let page = req.params.page;
  let start = (page-1)*10;
  let sql = "select cid,articleId,content,author,date from comment order by cid desc limit " + start + ",10;";
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

// 评论数量 接口
router.get('/commentCount', (req, res) => {
  let sql = "select count(*) as count from comment";
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

// 查询评论 接口
router.get('/selComment', (req, res) => {
  // console.log(req.query.selId);
  let id = req.query.selId;
  let sql = 'select * from comment where cid ="' + id +'"';
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

// 添加评论 接口
router.post('/addComment', (req, res) => {
  let sql = 'insert into comment(cid, articleId, content, author, date) values(?,?,?,?,?)';
  let data = req.body;
  let time = (new Date()).getTime();
  // console.log(req.body);
  conn.query(sql, [time, data.articleId, data.content, data.author, data.date], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      return res.json({ status: 1, msg: '添加成功' })
    }
  })
});

// 删除评论 接口
router.post('/delComment', (req, res) => {
  // console.log(req.body);
  let cid = req.body._id;
  let sql = 'delete from comment where cid="' + cid + '"';
  conn.query(sql, cid, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      return res.json({ status: 1, msg: '删除成功' })
    }
  })
});

// 修改评论 接口
router.post('/updateComment', (req, res) => {
  // console.log(req.body);
  let data = req.body;
  let sql = 'update comment set articleId="'+ data.articleId +'", content="' + data.content + '", author="' + data.author + '", date="' + data.date +'" where cid="'+ data.id +'"';
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
