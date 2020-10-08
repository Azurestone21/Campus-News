<template>
  <div>
    <headers></headers>

    <!-- 文章列表 -->
    <div class="newsList">
      <ul>
        <li v-for="(item, index) in articleList" :key="index">
          <router-link :to="{path:'/home/articleInfo', query:{id: item.aid}}">{{item.title}}</router-link>
        </li>
        <!--<li><router-link to="">关注！广东省教育厅发布学生返校时间，分期、分批、错峰安排</router-link></li>-->
      </ul>
    </div>
    <!-- 文章列表 结束 -->

    <!-- 分页 -->
    <div class="page">
      <ul>
        <li v-for="(item, index) in articleCount" :key="index" >
          <a @click="pageClick($event)"
             :data-page="item">
            {{item}}
          </a>
        </li>
        <!--<li @click="pageClick($event)" data-page="2"><router-link to="">2</router-link></li>-->
      </ul>
    </div>
    <!-- 分页 结束-->

    <footers></footers>
  </div>
</template>

<script>
  import headers from './common/headers'
  import footers from './common/footers'
  export default {
    name: "more",
    components: {
      headers,
      footers
    },
    data() {
      return {
        // 文章列表
        articleList: [],
        // 页码数
        articleCount: [],
        // 初始化页码
        page: 1,
        // 文章类型
        sort: '',
      }
    },
    created() {
      this.sort = this.$route.query.sort;
    },
    mounted() {
      this.getCount();
      this.getData();
      // console.log(this.sort);
    },
    methods: {
      // 获取不同页面的文章
      getData() {
        $.ajax({
          url: '/api/home/articleList/' + this.sort + '/' + this.page,
          method: 'get',
          success: (res) => {
            this.articleList = res;
            this.articleList.reverse();
            // console.log(this.articleList.reverse())
          },
          error: (err) => {
            console.log(err)
          }
        });
      },

      // 获得文章数量
      getCount() {
        $.ajax({
          url: '/api/home/articleCount/' + this.sort,
          method: 'get',
          success: (res) => {
            // console.log(res)
            let count = res[0].count/10;
            for(let i=0; i<count; i++) {
              this.articleCount[i] = i+1;
            }
            // console.log(this.articleCount)
          },
          error: (err) => {
            console.log(err)
          }
        })
      },

      // 点击页码事件
      pageClick(e) {
        this.page = e.target.dataset.page;
        // console.log(this.page);
        $.ajax({
          url: '/api/home/articleList/' + this.sort + '/' + this.page,
          method: 'get',
          success: (res) => {
            this.articleList = res;
            // 逆转，时间最新的排前面
            this.articleList.reverse();
            // console.log(this.articleList.reverse())
          },
          error: (err) => {
            console.log(err)
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .newsList {
    margin: 50px auto;
    width: 80%;
    min-height: 310px;

    ul {
      list-style: inside;
      padding-left: 20px;
    }

    li {
      height: 35px;
      line-height: 35px;
      border-bottom: 1px dashed #999999;
      overflow: hidden;

      a {
        color: #555;
      }
    }
  }

  .page {
    height: 80px;
    /*background-color: #0a95ff;*/

    ul {
      margin: auto;
      list-style-type: none;
      padding-left: 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }

    li {
      margin-right: 10px;
      text-align: center;
      line-height: 20px;
      border: 1px solid #999999;

      a {
        display: inline-block;
        text-decoration: none;
        width: 20px;
        height: 20px;
        color: #ff7300;
        cursor: pointer;
      }
    }
    li:hover {
      border: 1px solid #fff;
      background-color: #ff7300;
      a {
        color: #fff;
      }
    }
  }

  @media screen and (max-width: 1200px) {
    .newsList {
      width: 100%;
      padding-right: 10px;
    }
  }
</style>
