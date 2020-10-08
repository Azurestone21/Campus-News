<template>
  <div>
    <!-- 标题 -->
    <div class="title">
      <h4>{{comment.id === '' || comment.id === undefined ? '添加评论':'修改评论'}}</h4>
    </div>
    <!-- 标题 结束 -->

    <!-- 内容 -->
    <form class="form-container" ref="form" enctype="multipart/form-data">
      <div class="form-group">
        <label>文章ID</label>
        <input type="text" class="form-control" placeholder="请输入文章ID" v-model="comment.articleId">
      </div>
      <div class="form-group">
        <label>评论内容</label>
        <input type="text" class="form-control" v-model="comment.content">
      </div>
      <div class="form-group">
        <label>评论人</label>
        <input type="text" class="form-control" v-model="comment.author">
      </div>
      <div class="form-group">
        <label>评论时间</label>
        <input type="date" class="form-control" v-model="comment.date">
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
  export default {
    name: "comment_edit",
    data() {
      return {
        _id: '',
        commentInfo: {},
        comment: {
          id: '',
          articleId: '',
          content: '',
          author: '',
          date: ''
        }
      }
    },
    created() {
      // 获取传过来需要修改的评论ID
      this._id = this.$route.query.id;
      // console.log(this.$route.query.id);
      // console.log(this._id);
      if (this._id !== undefined ) {
        // let fonts = {selId: this._id};
        this.$http.get('/api/comment/selComment', {params: {selId: this._id}})
          .then((response) => {
            // console.log(response.fonts);
            this.commentInfo = response.data[0];
            // console.log(this.commentInfo.cid);
            this.comment.id = this.commentInfo.cid;
            this.comment.articleId = this.commentInfo.articleId;
            this.comment.content = this.commentInfo.content;
            this.comment.author = this.commentInfo.author;
            this.comment.date = this.commentInfo.date.substring(0,10);
          })
      }
    },
    methods: {
      // 修改评论信息
      update() {
        console.log('修改操作');
        let data = this.comment;
        this.$http.post('/api/comment/updateComment',data,{emulateJSON:true})
          .then((response) => {
            alert("修改成功！");
            this.comment.id = '';
            this.comment.articleId = '';
            this.comment.content = '';
            this.comment.author = '';
            this.comment.date = '';
          }, (response) => {
            alert("修改失败！");
          })
      },
      // 添加评论
      submit() {
        console.log('添加操作');
        // console.log(this.user);
        let data = this.comment;
        if (data.articleId === '') {
          alert('请输入文章ID');
          return;
        }
        if (data.content === '') {
          alert('请输入评论内容');
          return;
        }
        if (data.author === '') {
          alert('请输入评论人');
          return;
        }
        if (data.date === '') {
          alert('请输入时间');
          return;
        }

        this.$http.post('/api/comment/addComment',data,{emulateJSON:true})
          .then((response) => {
            console.log(response);
            alert("提交成功！");
            this.comment.articleId = '';
            this.comment.content = '';
            this.comment.author = '';
            this.comment.date = '';
          }, (response) => {
            alert("提交失败！");
            this.comment.articleId = '';
            this.comment.content = '';
            this.comment.author = '';
            this.comment.date = '';
          });
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
</style>
