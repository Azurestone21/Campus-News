<template>
  <div>
    <div id="header">
      <!-- 标题 -->
      <h3>后台管理系统</h3>
      <!-- 用户 -->
      <div class="userMenu" v-on:click="userLogout">
        <span>{{username}}</span>
        <ul class="logout">
          <router-link to="/login">
            <li>退出</li>
          </router-link>
        </ul>
      </div>
    </div>

    <!-- 主体 -->
    <div id="content">
      <!-- 左侧菜单栏 -->
      <div class="aside">
        <ul class="level">
          <li class="one">
            <span class="levelTitle">用户管理 &nbsp; > </span>
            <ul class="two twoActive">
              <router-link to="/user"><li :class="{active:activeIndex === 1}" @click="active(1)">用户列表</li></router-link>
              <router-link to="/user_edit"><li :class="{active:activeIndex === 2}" @click="active(2)">添加用户</li></router-link>
            </ul>
          </li>
          <li class="one">
            <span class="levelTitle">文章管理 &nbsp; > </span>
            <ul class="two">
              <router-link to="/article"><li :class="{active:activeIndex === 3}" @click="active(3)">文章列表</li></router-link>
              <router-link to="/article_edit"><li :class="{active:activeIndex === 4}" @click="active(4)">添加文章</li></router-link>
            </ul>
          <li class="one">
            <span class="levelTitle">评论管理 &nbsp; > </span>
            <ul class="two">
              <router-link to="/comment"><li :class="{active:activeIndex === 5}" @click="active(5)">评论列表</li></router-link>
              <router-link to="/comment_edit"><li :class="{active:activeIndex === 6}" @click="active(6)">添加评论</li></router-link>
            </ul>
          </li>
        </ul>
      </div>

      <!-- 内容 -->
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import {getWindowinfo} from "../../assets/js/adminLayout.js"
  export default {
    name: "index",
    data() {
      return {
        activeIndex: 1,
        username: ''
      }
    },
    mounted() {
      getWindowinfo();
      this.openMenu();
      this.username = sessionStorage.getItem('username');
    },
    methods: {
      // 打开/收起菜单
      openMenu() {
        let one = document.getElementsByClassName("one");
        let levelTitle = document.getElementsByClassName("levelTitle");
        for(let i=0; i<levelTitle.length; i++) {
          let _this = one[i];
          levelTitle[i].addEventListener('click', function(){
            if(_this.children[1].classList.contains('twoActive')) {
              _this.children[1].classList.remove('twoActive')
            } else {
              _this.children[1].classList.add('twoActive')
            }
          })
        }
      },
      // 退出登录显示
      userLogout() {
        let logout = document.getElementsByClassName("logout")[0];
        if (logout.classList.contains('userMenuActive')) {
          logout.classList.remove('userMenuActive')
        } else {
          logout.classList.add('userMenuActive')
        }
      },
      // 菜单选中切换
      active(index) {
        this.activeIndex = index
      }
    }
  }
</script>

<style lang="less" scoped>
  * {
    padding: 0;
    margin: 0;
  }

  /* 头部 */
  #header {
    width: 100%;
    height: 60px;
    background-color: #122B40;
    border-bottom: .5px solid #464646;
    position: relative;

    h3 {
      width: 250px;
      margin: 0;
      line-height: 60px;
      color: #fff;
      text-align: center;
    }

    .userMenu {
      width: 100px;
      height: 60px;
      line-height: 60px;
      position: absolute;
      right: 0;
      top: 0;
      background-color: #122B40;
      text-align: center;

      span {
        padding-left: 20px;
        font-weight: bold;
        color: #fff;
        padding-right: 10px;
      }
    }
    .userMenu:hover {
      background-color: #193d5a;
    }

    .logout {
      background-color: #fff;
      display: none;

      li {
        height: 30px;
        list-style: none;
        line-height: 30px;
        background-color: #fff;
        border: .5px solid #828282;
        border-radius: 3px;
      }

      a {
        color: #000000;
      }
    }

    .userMenuActive {
      display: block;
    }
  }

  #content {
    display: flex;
    overflow: hidden;
  }

  /* 左侧菜单栏 */
  .aside {
    width: 250px;
    background-color: #193d5a;

    ul {
      list-style: none;
      background-color: #193D5A;
      /* background-color: #122B40; */
    }

    li {
      width: 100%;
      /* 	height: 40px; */
      background-color: #122B40;
      line-height: 40px;

    }

    .one {
      position: relative;
      background-color: #193D5A;
      border-bottom: .5px solid #143047;
      cursor: pointer;

      span {
        padding-left: 20px;
        font-weight: bold;
        color: #fff;
      }
    }

    .one::before {
      position: absolute;
      top: 0;
      left: 0;
      content: "";
      width: 6px;
      height: 40px;
      background-color: #0a95ff;
    }

    .two {
      display: none;

      a {
        text-decoration: none;
        color: #b6b6b6;

        li {
          padding-left: 20px;
        }
      }
    }

    .twoActive {
      display: block;
    }

    .active {
      color: #fff;
    }
  }

  /* 内容 */
  .main {
    padding: 30px 30px;
    overflow: auto;
  }

</style>
