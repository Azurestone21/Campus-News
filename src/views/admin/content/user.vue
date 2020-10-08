<template>
  <div>
    <!-- 标题 -->
    <div class="title">
      <h4>
        用户
        <router-link to="/user_edit" class="btn btn-primary new">新增用户</router-link>
      </h4>
    </div>
    <!-- 标题 结束 -->

    <!-- 内容 -->
    <table class="table table-striped table-bordered table-hover custom-table">
      <thead>
      <tr>
        <th>学工号</th>
        <th>姓名</th>
        <th>联系方式</th>
        <th>角色</th>
        <th>状态</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in userList" :key="index">
        <td>{{item.id}}</td>
        <td>{{item.username}}</td>
        <td>{{item.tel}}</td>
        <td>{{item.role}}</td>
        <td>{{item.status === 0 ? '启用' : '禁用'}}</td>
        <td>
          <router-link class="glyphicon glyphicon-edit"
                       :to="{path: '/user_edit', query: {id: item.id}}">
          </router-link>
          <a class="glyphicon glyphicon-remove"
             data-toggle="modal" data-target="#modal"
             :data-id="item.id" @click="delUser($event)">
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
      <li v-for="(item, index) in userCount" :key="index">
        <a @click="pageClick($event)"
           :data-page="item">
          {{index+1}}
        </a>
      </li>
      <!--<li><a href="#">2</a></li>
      <li><a href="#">3</a></li>
      <li><a href="#">4</a></li>
      <li><a href="#">5</a></li>-->
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
            <p>您确定要删除这个用户吗?</p>
            <input type="hidden" name="id" id="deleteUserId">
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
    name: "user",
    data() {
      return {
        // 用户列表
        userList: [],
        // 页码数
        userCount: [],
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
          this.$http.get('/api/user/userList/' + this.page)
            .then((response) => {
              this.userList = response.data;
            })
        }
        // console.log(this.page);
      },
      // 后一页
      back() {
        if (this.page >= this.userCount.length) {
          return false;
        } else {
          this.page = Number(this.page) + 1;
          this.$http.get('/api/user/userList/' + this.page)
            .then((response) => {
              this.userList = response.data;
            })
        }
      },

      // 获取用户
      getData() {
        this.$http.get('/api/user/userList/'+ this.page)
          .then((response) => {
            // console.log(response.fonts);
            this.userList = response.data;
          })
      },
      // 获取用户数量
      getCount() {
        this.$http.get('/api/user/userCount')
          .then((response) => {
            // console.log(response);
            let count = Math.ceil(response.body[0].count/10);
            // console.log(count);
            for(let i=0; i<count; i++) {
              this.userCount[i] = i+1;
            }
          });
      },

      // 点击页码事件
      pageClick(e) {
        this.page = e.target.dataset.page;
        // console.log(this.page);
        this.$http.get('/api/user/userList/' + this.page)
          .then((response) => {
            // console.log(response.fonts);
            this.userList = response.data;
          })
      },

      // 关闭弹出框
      close() {
        $('#modal').modal('hide')
      },
      // 删除用户按钮
      delUser(e) {
        // 显示弹框
        $('#modal').modal('show');
        // 获取用户id
        let id = e.target.dataset.id;
        // console.log(id);
        // 将要删除的用户id存储在隐藏域中
        $('#deleteUserId').val(id);
      },
      // 确认删除用户
      confirm() {
        // console.log($('#deleteUserId').val())
        let id = $('#deleteUserId').val();
        this.$http.post('/api/user/delUser',{_id: id},{emulateJSON:true})
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
