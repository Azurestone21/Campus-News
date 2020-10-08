<template>
  <div>
    <!-- 标题 -->
    <div class="title">
      <h4>
        文章
        <router-link to="/article_edit" class="btn btn-primary new">新增文章</router-link>
      </h4>
    </div>
    <!-- 标题 结束 -->

    <!-- 内容 -->
    <table class="table table-striped table-bordered table-hover custom-table">
      <thead>
      <tr>
        <th>ID</th>
        <th>标题</th>
        <th>类别</th>
        <th>发布时间</th>
        <th>作者</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in articleList" :key="index">
        <td>{{item.aid}}</td>
        <td>{{item.title}}</td>
        <td>{{item.sort}}</td>
        <td>{{item.date}}</td>
        <td>{{item.author}}</td>
        <td>
          <router-link class="glyphicon glyphicon-edit"
                       :to="{path: '/article_edit', query: {id: item.aid}}">
          </router-link>
          <!--<a href="article.html" class="glyphicon glyphicon-edit"></a>-->
          <a class="glyphicon glyphicon-remove"
             data-toggle="modal" data-target="#modal"
             :data-aid="item.aid" @click="delArticle($event)">
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
      <li v-for="(item, index) in articleCount" :key="index">
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
            <p>您确定要删除这篇文章吗?</p>
            <input type="hidden" name="id" id="deleteArticleId">
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
    name: "articles",
    data() {
      return {
        // 文章列表
        articleList: [],
        // 页码数
        articleCount: [],
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
          this.$http.get('/api/article/articleList/' + this.page)
            .then((response) => {
              this.articleList = response.data;
            })
        }
        // console.log(this.page);
      },
      // 后一页
      back() {
        if (this.page >= this.articleCount.length) {
          return false;
        } else {
          this.page = Number(this.page) + 1;
          this.$http.get('/api/article/articleList/' + this.page)
            .then((response) => {
              this.articleList = response.data;
            })
        }
      },

      // 获取文章
      getData() {
        this.$http.get('/api/article/articleList/'+ this.page)
          .then((response) => {
            // console.log(response.fonts);
            this.articleList = response.data;
          })
      },
      // 获取文章数量
      getCount() {
        this.$http.get('/api/article/articleCount')
          .then((response) => {
            // console.log(response);
            let count = Math.ceil(response.body[0].count/10);
            // console.log(count);
            for(let i=0; i<count; i++) {
              this.articleCount[i] = i+1;
            }
          });
      },

      // 点击页码事件
      pageClick(e) {
        this.page = e.target.dataset.page;
        // console.log(this.page);
        this.$http.get('/api/article/articleList/' + this.page)
          .then((response) => {
            this.articleList = response.data;
          })
      },

      // 关闭弹出框
      close() {
        $('#modal').modal('hide')
      },
      // 删除文章按钮
      delArticle(e) {
        // 显示弹框
        $('#modal').modal('show');
        // 获取文章id
        let aid = e.target.dataset.aid;
        // console.log(aid);
        // 将要删除的用户id存储在隐藏域中
        $('#deleteArticleId').val(aid);
      },
      // 确认删除文章
      confirm() {
        // console.log($('#deleteArticleId').val())
        let aid = $('#deleteArticleId').val();
        this.$http.post('/api/article/delArticle',{_aid: aid},{emulateJSON:true})
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
