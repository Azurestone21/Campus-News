// 创建服务器
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// 登录
const loginApi = require('./api/loginApi');
// 用户
const userApi = require('./api/userApi');
// 文章
const articleApi = require('./api/articleApi');
// 评论
const commentApi = require('./api/commentApi');
// 上传文件
const uploadApi = require('./api/uploadApi');
// 首页
const homeApi = require('./api/homeApi');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 后端api路由
app.use('/api/login', loginApi);
app.use('/api/user', userApi);
app.use('/api/article', articleApi);
app.use('/api/upload', uploadApi);
app.use('/api/comment', commentApi);
// 前台api路由
app.use('/api/home', homeApi);

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');
