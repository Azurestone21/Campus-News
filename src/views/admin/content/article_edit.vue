<template>
  <div>
    <!-- 标题 -->
    <div class="title">
      <h4>{{_id === undefined || _id === '' ? '添加文章':'修改文章'}}</h4>
    </div>
    <!-- 标题 结束 -->

    <!-- 内容 -->
    <form class="form-container" ref="form" enctype="multipart/form-data">
      <div class="form-group">
        <label>标题</label>
        <input type="text" class="form-control" placeholder="请输入文章标题" v-model="article.title">
      </div>
      <div class="form-group">
        <label>作者</label>
        <input type="text" class="form-control" readonly v-model="article.author">
      </div>
      <div class="form-group">
        <label>发布时间</label>
        <input type="date" class="form-control" v-model="article.date">
      </div>
      <div class="form-group">
        <label>文章类型</label>
        <select class="form-control" v-model="article.sort">
          <option value="学校要闻">学校要闻</option>
          <option value="校园快讯">校园快讯</option>
          <option value="通知公告">通知公告</option>
        </select>
      </div>

      <div class="form-group">
        <label>文章封面</label>
        <input type="file" @change="handleFileChange" ref="inputer" isvalid="yes" id="file">
        <div class="thumbnail-waper">
          <img class="img-thumbnail" src="" id="preview">
        </div>
      </div>
      <div class="form-group editor">
        <label>内容</label>
            <ckeditor :editor="editor" v-model="editorData"
                      :config="editorConfig">
            </ckeditor>
      </div>
      <div class="buttons">
        <input type="submit" class="btn btn-primary"
               :value="_id === undefined ? '添加':'修改'"
               @click.prevent="_id === undefined ? submit() : update()">
      </div>
    </form>
    <!-- 内容 结束 -->
  </div>
</template>

<script>
  import axios from 'axios';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  export default {
    name: "article_edit",
    data() {
      return {
        // 富文本编辑器
        editor: ClassicEditor,
        editorData: '<p>Content of the editor.</p>',
        editorConfig: {
          // The configuration of the editor.
        },
        // 文章id
        _id: '',
        // 文章详情
        articleInfo: {},
        article: {
          id: '',
          title: '',
          author: '',
          date: '',
          sort: '学校要闻',
          cover: '',
          content: this.editorData
        },
        file: {},
      };
    },
    created() {
      // 获取传过来需要修改的文章ID
      this._id = this.$route.query.id;
      // console.log(this._id);
      // 获取文章ID的详细信息
      if (this._id !== undefined ) {
        this.$http.get('/api/article/selArticle', {params: {selId: this._id}})
          .then((response) => {
            this.articleInfo = response.body[0];
            this.article.id = this.articleInfo.aid;
            this.article.title = this.articleInfo.title;
            // this.article.author = this.articleInfo.author;
            this.article.date = this.articleInfo.date.substring(0,10);
            this.article.sort = this.articleInfo.sort;
            this.editorData = this.articleInfo.content;
            this.article.content = this.editorData;
          });
      }
      this.article.author = sessionStorage.getItem('id');
    },
    methods: {
      // 修改文章信息
      update() {
        console.log('修改操作');
        this.article.content = this.editorData;
        let data = this.article;
        this.$http.post('/api/article/updateArticle',data,{emulateJSON:true})
          .then((response) => {
            alert("修改成功！");
            this.article.title = '';
            this.article.author = '';
            this.article.date = '';
            this.article.sort = '学校要闻';
            this.editorData = '<p>Content of the editor.</p>';
          }, (response) => {
            alert("修改失败！");
          })
      },

      //选择文件后，预览图片
      handleFileChange(e) {
        // 获取上传文件
        this.file = document.querySelector("#file").files[0];
        // console.log(this.file);
        // 预览
        let preview = document.querySelector("#preview");
        // 创建文件读取对象
        let reader = new FileReader();
        // 用户选择的文件列表
        // console.log(file.files[0]);
        // 读取文件
        reader.readAsDataURL(this.file);
        // 监听onload事件
        reader.onload = function () {
          // console.log(reader.result);
          // 将读取的结果显示在页面中
          preview.src = reader.result;
        }
      },

      // 添加文章操作
      submit() {
        console.log('添加操作');
        let preview = document.querySelector("#preview");

        // 空值验证
        // console.log(this.article);
        let data = this.article;
        if (data.title === '') {
          alert('请输入标题');
          return;
        }
        if (data.author === '') {
          alert('请输入作者');
          return;
        }
        if (data.date === '') {
          alert('请输入日期');
          return;
        }
        if (data.content === '') {
          alert('请输入文章内容');
          return;
        }
        this.article.content = this.editorData;
        if (data.content === '') {
          alert('请输入文章内容');
          return;
        }

        // 没有图片上传
        if (preview.src == 'http://127.0.0.1:8080/article_edit' || preview.src == '')
        {
          this.$http.post('/api/article/addArticle', data, {emulateJSON:true})
            .then((response) => {
              // console.log(response);
              alert("提交成功！");
              this.article.title = '';
              this.article.date = '';
              this.article.sort = '学校要闻';
              preview.src = '';
              this.article.cover = preview.src;
              this.editorData = '<p>Content of the editor.</p>';
            }, (response) => {
              alert("提交失败！");
            })
        } else {
          // 上传图片
          // 声明一个FormData对象
          let formData = new FormData();
          // 这里的 'file' 要和 接口 接收的 upload.single('file') 一致
          formData.append('file', this.file, this.file.name);
          this.$http.post('/api/upload/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-fonts'
            }
          }).then((res) => {
            // console.log(res);
            // 图片上传路径  例：upload\1591455506326-2.png
            this.article.cover = res.data.msg;
            // console.log(this.article.cover);
            if (res.data.msg) {
              this.$http.post('/api/article/addArticle', data, {emulateJSON:true})
                .then((response) => {
                  // console.log(response);
                  alert("提交成功！");
                  this.article.title = '';
                  this.article.date = '';
                  this.article.sort = '学校要闻';
                  preview.src = '';
                  this.article.cover = preview.src;
                  this.editorData = '<p>Content of the editor.</p>';
                }, (response) => {
                  alert("提交失败！");
                })
            }
          });
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .title {
   margin-bottom: 20px;
   position: relative;

     h4 {
       font-weight: bold;
       color: #000;
       font-size: 22px;
       position: relative;
       line-height: 32px;
     }

     .new {
       position: absolute;
       right: 0;
       top: 0px;
     }
   }

   .ck li {
    background-color: #fff;
   }
</style>
