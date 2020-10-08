const express = require('express');
const router = express.Router();

//express框架上传文件所需要的中间件
const multer = require('multer');
const fs = require('fs');
//创建文件夹
let createFileDirectory = function(path) {
  try {
    //检测文件夹是否存在，不存在抛出错误
    fs.accessSync(path);
  } catch (error) {
    //创建文件夹
    fs.mkdirSync(path);
  }
};
// multer文件的硬盘存储模式
let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    //先创建路径在保存
    createFileDirectory('./upload/');
    //指定文件保存路径
    cb(null, './upload/');
  },
  filename: function(req, file, cb) {
    // console.log(file);
    // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
    cb(null, Date.now() + '-' + file.originalname);
  }
});

let upload = multer({
  storage: storage
});

// 用户列表 接口
router.post('/upload', upload.single('file'), (req, res) => {
  let cover = req.file;
  // console.log(cover);
  if (res) {
    // console.log('文件:' + cover.path + '上传成功！');
    return res.json({
      status: true,
      msg: cover.path
    })
  } else {
    console.log('文件:' + cover.path + '上传失败！');
  }
  // res.send(1);
  /*if (cover) {
    fs.unlink(cover.path, (e) => {
      if (e) {
        console.log('文件操作失败');
        throw e;
      } else
        console.log('文件:' + cover.path + '删除成功！');
    });
  }*/
});

module.exports = router;
