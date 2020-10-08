<template>
  <div>
    <!-- 分类标题 -->
    <div class="title">
      <h4>{{_id === undefined || _id === '' ? '添加信息':'修改信息'}}</h4>
    </div>
    <!-- 标题 结束 -->

    <!-- 内容 -->
    <form class="form-container">
      <div class="form-group">
        <label>学号</label>
        <input type="text" class="form-control" placeholder="请输入学号" v-model="user.id" :disabled="_id === undefined ? false : true">
      </div>
      <div class="form-group">
        <label>姓名</label>
        <input type="text" class="form-control" placeholder="请输入姓名" v-model="user.username">
      </div>
      <div class="form-group">
        <label>密码</label>
        <input type="password" class="form-control" placeholder="请输入6-20位密码" v-model="user.password">
      </div>
      <div class="form-group">
        <label>联系方式（手机号)</label>
        <input type="phone" class="form-control" placeholder="请输入手机号" v-model="user.tel">
      </div>
      <div class="form-group">
        <label>角色</label>
        <select class="form-control" v-model="user.role">
          <option value="学生">学生</option>
          <option value="教师">教师</option>
          <option value="管理员">管理员</option>
        </select>
      </div>
      <div class="form-group">
        <label>状态</label>
        <select class="form-control" v-model="user.status">
          <option value="0">启用</option>
          <option value="1">禁用</option>
        </select>
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
  // 加解密模块
  import CryptoJS from "crypto-js";
  export default {
    name: "user_edit",
    data() {
      return {
        _id: '',
        userInfo: {},
        user: {
          id: '',
          username: '',
          password: '',
          tel: '',
          role: '学生',
          status: 0
        },
        flags: '',
      }
    },
    created() {
      this._id = this.$route.query.id;
      // console.log(this._id);
      if (this._id !== undefined ) {
        this.$http.get('/api/user/selUser', {params: {selId: this._id}})
          .then((response) => {
            // console.log(response.fonts);
            this.userInfo = response.data[0];
            // console.log(this.userInfo.id);
            this.user.id = this.userInfo.id;
            this.user.username = this.userInfo.username;
            this.user.password = this.userInfo.password;
            this.flags = this.userInfo.password;
            this.user.tel = this.userInfo.tel;
            this.user.role = this.userInfo.role;
            this.user.status = this.userInfo.status;
          })
      }
    },
    methods: {
      // 修改用户信息
      update() {
        console.log('修改操作');
        let data = this.user;
        if (data.password !== this.flags) {
          let cipherText = CryptoJS.AES.encrypt(
            data.password,
            "123456"
          ).toString();
          data.password = cipherText;
        }
        this.$http.post('/api/user/updateUser',data,{emulateJSON:true})
          .then((response) => {
            alert("修改成功！");
            this.user.id = '';
            this.user.username = '';
            this.user.password = '';
            this.user.tel = '';
            this.user.role = '学生';
            this.user.status = 0;
          }, (response) => {
            alert("修改失败！");
          })
      },
      // 添加用户
      submit() {
        console.log('添加操作');
        // console.log(this.user);
        let data = this.user;
        if (data.id === '') {
          alert('请输入学号');
          return;
        }
        if (data.username === '') {
          alert('请输入姓名');
          return;
        }
        if (data.password === '') {
          alert('请输入密码');
          return;
        }
        if (data.password.length < 6 || data.password.length > 20) {
          alert('请输入6-20位的密码');
          return;
        }
        let cipherText = CryptoJS.AES.encrypt(
          data.password,
          "123456"
        ).toString();
        data.password = cipherText;
        // console.log(data.password);

        if (data.tel === '') {
          alert('请输入手机号');
          return;
        }
        if (data.tel.length < 11) {
          alert('请输入正确的手机号');
          return;
        }

        this.$http.post('/api/user/addUser',data,{emulateJSON:true})
          .then((response) => {
            console.log(response);
            alert("提交成功！");
            this.user.id = '';
            this.user.username = '';
            this.user.password = '';
            this.user.tel = '';
            this.user.role = '学生';
            this.user.status = 0;
          }, (response) => {
            alert("提交失败！");
            this.user.id = '';
            this.user.username = '';
            this.user.password = '';
            this.user.tel = '';
            this.user.role = '学生';
            this.user.status = 0;
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

