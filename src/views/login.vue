<template>
  <div id="login">
    <div class="title">
      <h3>登录</h3>
    </div>

    <form id="login-form">
      <div class="form-group">
        <label>账号</label>
        <input name="id" type="text" class="form-control" placeholder="请输入你的学号" v-model="loginInfo.id">
      </div>
      <div class="form-group">
        <label>密码</label>
        <input name="password" type="password" class="form-control" placeholder="请输入你的密码" v-model="loginInfo.password">
      </div>

      <div class="checkbox">
        <label>
          <input type="checkbox" @click="remember($event)">记录密码
        </label>
      </div>

      <div class="login-button">
        <button type="submit" @click.prevent="loginClick()" class="btn btn-default btn-color">登录</button>
      </div>
    </form>
  </div>
</template>

<script>
  // 加解密模块
  import CryptoJS from "crypto-js";
  export default {
    name: "login",
    data() {
      return {
        loginInfo: {
          // 用户
          id: '',
          password: '',
        },
        // 是否记住密码
        checked: '',
      }
    },
    mounted() {
      sessionStorage.setItem('id', '');
      sessionStorage.setItem('username', '');
      sessionStorage.setItem('clientId', '');
      sessionStorage.setItem('clientName', '');
      this.getCookie();
    },

    methods: {
      remember(e) {
        this.checked = e.target.checked;   // true / false
        // console.log(this.checked);
      },
      loginClick() {
        let _this = this;
        if (this.loginInfo.id === '') {
          alert('账号不得为空');
          return;
        }
        if (this.loginInfo.password === '') {
          alert('密码不得为空');
          return;
        }
        let data = this.loginInfo;
        this.$http.post('/api/login/userLogin', data, {emulateJSON:true})
          .then((response) => {
            // alert("登录成功！");
            // console.log(response);
            if (response.body.msg === '登录成功') {
              // 记住密码
              // console.log(typeof _this.checked);
              if (_this.checked === true) {
                // 设置cookie
                // 密码加密
                let cipherText = CryptoJS.AES.encrypt(
                  this.loginInfo.password,
                  "123456"
                ).toString();
                this.loginInfo.password = cipherText;
                _this.setCookie(this.loginInfo.id, this.loginInfo.password, 7);
              } else {
                //清空Cookie
                _this.clearCookie();
              }
              // console.log(response.body.result.role);
              if (response.body.result.role === '管理员') {
                sessionStorage.setItem('id', this.loginInfo.id);
                sessionStorage.setItem('username', response.body.result.username);
                this.$router.push({path: '/user'})
              } else {
                sessionStorage.setItem('clientId', this.loginInfo.id);
                sessionStorage.setItem('clientName', response.body.result.username);
                this.$router.push({path: '/home'})
              }

            } else {
              alert("账号或密码不正确")
            }
          }, (response) => {
            alert("账号或密码不正确");
            this.$router.go(0)  // 刷新当前页面
          });
      },

      // 设置cookie
      setCookie(id, password, exdays) {
        // 获取时间
        let date = new Date();
        // 保存的天数
        date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * exdays);
        // 字符串拼接cookie
        window.document.cookie = "id" + "=" + id + ";path=/;expires=" + date.toGMTString();
        window.document.cookie = "password" + "=" + password + ";path=/;expires=" + date.toGMTString();
      },
      //读取cookie
      getCookie() {
        if (document.cookie.length > 0) {
          let arr = document.cookie.split('; ');
          for (let i=0; i <arr.length; i++) {
            let arr2 = arr[i].split('=');
            // 判断查找相对应的值
            if (arr2[0] === 'id') {
              this.loginInfo.id = arr2[1];
            } else if (arr2[0] === 'password') {
              // this.loginInfo.password = arr2[1];
              // 密码解密
              let passwd = arr2[1];
              let bytes = CryptoJS.AES.decrypt(passwd, "123456");
              this.loginInfo.password = bytes.toString(CryptoJS.enc.Utf8);
            }
          }
        }
      },
      //清除cookie
      clearCookie() {
        this.setCookie("", "", -1);
      }
    }
  }
</script>

<style scoped>
  #login {
    width: 500px;
    height: 370px;
    margin: 150px auto;
    border: 1px solid #e0e0e0;
    padding: 10px 30px;
    background-color: #fff;
  }

  #login .title h3 {
    font-weight: bold;
    font-size: 26px;
    margin: 30px 0 10px 0;
  }

  #login .form-group label {
    font-weight: bold;
    margin: 5px 0 3px;
  }

  #login button {
    width: 100%;
    height: 35px;
    color: #fff;
    background-color: #374a80;
    border: none;
    margin-top: 10px;
  }

  @media screen and (max-width: 500px) {
    #login {
      width: 100%;
    }
  }
</style>
