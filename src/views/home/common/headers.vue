<template>
  <div>
    <!--头部-->
    <div id="header">
      <div class="top">
        <div class="content">
          <div class="login">
            <ul>
              <li v-if="clientName === null || clientName === ''"><router-link to="/login">登录</router-link></li>
              <li v-if="clientName !== '' && clientName !== null"><router-link to="/login">退出</router-link></li>
              <li v-if="clientName !== '' && clientName !== null">{{clientName}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="content">
          <div class="title">
            <h3><router-link to="/home">校园新闻网</router-link></h3>
          </div>
          <div class="search">
            <input type="text" v-model="searchInfo">
            <router-link :to="{path:'/home/search', query:{searchInfo: searchInfo}}"><img src="../../../assets/fonts/search.svg" alt="" @click="search()"></router-link>

          </div>
        </div>
      </div>
    </div>
    <!--头部 结束-->
  </div>
</template>

<script>
  export default {
    name: "default",
    data() {
      return {
        // 登录用户
        clientName: '',
        // 搜索内容
        searchInfo: '',
      }
    },
    created() {
      this.clientName = sessionStorage.getItem('clientName');
      /*console.log(this.clientName);
      console.log(typeof this.clientName)*/
    },
    methods: {
      search() {
        if (this.searchInfo === '') {
          alert('搜索内容为空！');
          return;
        }
        if (this.$route.path.indexOf('/home/search') != -1) {
          this.$router.go(0);
          return;
        }
      }
    },
  }
</script>

<style lang="less" scoped>
  .content {
    width: 80%;
    height: 100%;
    margin: auto;
    display: flex;
  }
  h4 {
    font-size: 18px;
    line-height: 30px;
    color: #279fc2;
  }

  /* 头部 */
  #header {
    width: 100%;
    height: 105px;
    border-bottom: 1px solid #999999;
    background-color: #fff;

    ul {
      list-style: none;
    }
    /* 上部分 */
    .top {
      height: 35px;
      background-color: #2b689b;
    }
    /* 下部分 */
    .bottom {
      height: 70px;
    }

    /*登录按钮*/
    .login {
      height: 100%;
      flex: 1;
      ul {
        height: 100%;
        overflow: hidden;
      }
      li {
        float: right;
        width: 70px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        cursor: pointer;
        color: #fff;
      }
      a {
        color: #fff;
      }
      a:hover {
        color: #bdccfc;
      }
    }

    /*标题*/
    .title {
      height: 100%;
      flex: 1;
      line-height: 70px;
      /*background-color: #42b983;*/

      a {
        font-size: 32px;
        margin: 18px 0;
        font-weight: bolder;
        color: #343434;
      }

      a:hover {
        text-decoration: none;
      }
    }

    /*搜索*/
    .search {
      height: 100%;
      flex: 1;
      line-height: 70px;
      text-align: right;

      input {
        width: 300px;
        height: 35px;
        border-radius: 20px;
        outline: none;
        padding: 0 20px;
        border: 1px solid #999999;
      }

      img {
        cursor: pointer;
      }
    }
  }
  /* 头部 结束 */

  @media screen and (max-width: 1200px) {
    .content {
      width: 100%;
    }
    h4 {
      padding-left: 20px;
    }
    #header {
      .title h3 {
        padding-left: 20px;
      }
      .search {
        padding-right: 20px;
      }
    }
  }

  @media screen and (max-width: 740px) {
    #header {
      .search input {
        width: 200px;
      }
    }
  }

  @media screen and (max-width: 510px) {
    #header {
      .title {
        flex: 1;
      }
      .title h3 a {
        font-size: 28px;
        margin: 20px 0;
      }
      .search {
        position: relative;
      }
      .search input {
        width: 120px;
        height: 30px;
        position: absolute;
        right: 55px;
        top: 20px;
      }
    }
  }
</style>
