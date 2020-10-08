<template>
  <div>
    <!-- 标题 -->
    <div class="title">
      <h4>
        评论
        <router-link to="/comment_edit" class="btn btn-primary new">新增评论</router-link>
      </h4>
    </div>
    <!-- 标题 结束 -->

    <!-- 内容 -->
    <table class="table table-striped table-bordered table-hover custom-table">
      <thead>
      <tr>
        <th>ID</th>
        <th>文章</th>
        <th>评论内容</th>
        <th>评论用户</th>
        <th>评论时间</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in commentList" :key="index">
        <td>{{item.cid}}</td>
        <td>{{item.articleId}}</td>
        <td>{{item.content}}</td>
        <td>{{item.author}}</td>
        <td>{{item.date}}</td>
        <td>
          <router-link class="glyphicon glyphicon-edit"
                       :to="{path: '/comment_edit', query: {id: item.cid}}">
          </router-link>
          <a class="glyphicon glyphicon-remove"
             data-toggle="collapse" data-target=".confirm-modal"
             :data-id="item.cid" @click="delComment($event)">
          </a>
        </td>
      </tr>
      </tbody>
    </table>
    <!-- 内容 结束 -->

    <!-- 分页 -->
    <ul class="pagination">
      <li>
        <a href="#" @click="front()">
          <span>&laquo;</span>
        </a>
      </li>
      <li v-for="(item, index) in commentCount" :key="index">
        <a @click="pageClick($event)"
           :data-page="item">
          {{index+1}}
        </a>
      </li>
      <li>
        <a href="#" @click="back()">
          <span>&raquo;</span>
        </a>
      </li>
    </ul>
    <!-- 分页 结束 -->

    <!-- 删除确认弹出框 -->
    <div class="modal fade confirm-modal" id="modal">
      <div class="modal-dialog modal-lg">
        <form class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" @click="close()"><span>&times;</span></button>
            <h4 class="modal-title">请确认</h4>
          </div>
          <div class="modal-body">
            <p>您确定要删除这条评论吗?</p>
            <input type="hidden" name="id" id="deleteCommentId">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" @click="close()">取消</button>
            <input type="submit" class="btn btn-primary" @click="confirm()">
          </div>
        </form>
      </div>
    </div>
    <!-- 删除确认弹出框 结束-->
  </div>
</template>

<script>
  export default {
    name: "comment",
    data() {
      return {
        // 评论列表
        commentList: [],
        // 页码数
        commentCount: [],
        // 初始化页码
        page: 1,
      }
    },
    created() {
      this.getCount();
    },
    mounted() {
      this.getData();
    },
    methods: {
      // 前一页
      front() {
        if (this.page <= 1) {
          return false;
        } else {
          this.page = Number(this.page) - 1;
          this.$http.get('/api/comment/commentList/' + this.page)
            .then((response) => {
              this.commentList = response.data;
            })
        }
        // console.log(this.page);
      },
      // 后一页
      back() {
        if (this.page >= this.commentCount.length) {
          return false;
        } else {
          this.page = Number(this.page) + 1;
          this.$http.get('/api/comment/commentList/' + this.page)
            .then((response) => {
              this.commentList = response.data;
            })
        }
      },

      // 获取文章
      getData() {
        this.$http.get('/api/comment/commentList/'+ this.page)
          .then((response) => {
            // console.log(response.fonts);
            this.commentList = response.data;
          })
      },
      // 获取文章数量
      getCount() {
        this.$http.get('/api/comment/commentCount')
          .then((response) => {
            // console.log(response);
            let count = Math.ceil(response.body[0].count/10);
            // console.log(count);
            for(let i=0; i<count; i++) {
              this.commentCount[i] = i+1;
            }
          });
      },

      // 点击页码事件
      pageClick(e) {
        this.page = e.target.dataset.page;
        // console.log(this.page);
        this.$http.get('/api/comment/commentList/' + this.page)
          .then((response) => {
            // console.log(response.fonts);
            this.commentList = response.data;
          })
      },

      // 关闭弹出框
      close() {
          $('#modal').modal('hide')
      },
      // 删除按钮
      delComment(e) {
        // 显示弹框
        $('#modal').modal('show');
        // 获取id
        let id = e.target.dataset.id;
        // console.log(id);
        // 将要删除的id存储在隐藏域中
        $('#deleteCommentId').val(id);
      },
      // 确认删除
      confirm() {
        // console.log($('#deleteArticleId').val())
        let id = $('#deleteCommentId').val();
        this.$http.post('/api/comment/delComment',{_id: id},{emulateJSON:true})
          .then((response) => {
            alert("删除成功！");
          }, (response) => {
            alert("删除失败！");
          })
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

