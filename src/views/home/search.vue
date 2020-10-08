<template>
  <div>
    <headers></headers>

    <div class="newsList">
      <div class="nothing" v-if="articleList.length === 0">
        <p>没有此文章！</p>
      </div>
      <ul v-else>
        <li v-for="(item, index) in articleList" :key="index">
          <router-link :to="{path:'/home/articleInfo', query:{id: item.aid}}">{{item.title}}</router-link>
        </li>
      </ul>
    </div>

    <div class="page">
      <ul>
        <!--<li v-for="(item, index) in articleCount" :key="index" >
          <a @click="pageClick($event)"
             :data-page="item">
            {{item}}
          </a>
        </li>-->
        <!--<li @click="pageClick($event)" data-page="2"><router-link to="">2</router-link></li>-->
      </ul>
    </div>

    <footers></footers>
  </div>
</template>

<script>
  import headers from './common/headers'
  import footers from './common/footers'
  export default {
    name: "search",
    components: {
      headers,
      footers
    },
    data() {
      return {
        // 搜索词
        searchInfo: '',
        // 文章列表
        articleList: [],
      }
    },
    created() {
      this.searchInfo = this.$route.query.searchInfo;
      // console.log(this.searchInfo);
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        $.ajax({
          url: '/api/home/searchList/' + this.searchInfo,
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
    },
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

    .nothing {
      padding-left: 10px;

      p {
        font-size: 16px;
        color: #ff3131
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
