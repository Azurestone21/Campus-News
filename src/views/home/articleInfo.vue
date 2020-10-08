<template>
  <div class="box">
    <headers></headers>


    <div class="article">
      <div class="container">
        <!-- 文章 -->
        <div class="article-header">
          <h3 class="article-title">{{articleInfo.title}}</h3>
          <div class="article-info">
            <span class="author">新闻部</span>
            <span>{{articleInfo.date}}</span>
          </div>
        </div>
        <div class="article-content">
          <div class="newsImg">
            <img v-if="articleInfo.sort == '校园快讯'" :src="articleInfo.cover" class="img-responsive center-block" alt="">
          </div>
          <!-- 正文 -->
          <div class="plist" v-html="articleInfo.content"></div>
          <div class="newsImg">
            <img v-if="articleInfo.sort == '学校要闻'" :src="articleInfo.cover" class="img-responsive center-block" alt="">
          </div>
        </div>
        <!-- 文章 结束 -->

        <!-- 评论 -->
        <div class="article-comment">
          <h4>评论</h4>
          <form class="comment-form">
            <textarea class="comment" v-model="newComment"></textarea>
            <div class="items">
              <input type="submit" value="提交"
                     @click.prevent="submit()" v-if="clientName !== null && clientName !== ''">
              <p v-else>登录后可评论</p>
            </div>
          </form>
          <div class="comment-list">
            <!--<div>
              <div class="article-info">
                <span class="author">Coder</span>
                <span>2020-09-10</span>
                <span>wjb19891223@163.com</span>
              </div>
              <div class="comment-content">
                nice 就是这样, 非常好 !
              </div>
            </div>-->
            <div v-for="(item, index) in commentList" :key="index">
              <div class="article-info">
                <span class="author">{{item.author}}</span>
                <span>{{item.date}}</span>
              </div>
              <div class="comment-content">
                {{item.content}}
              </div>
            </div>
          </div>
        </div>
        <!-- 评论 结束 -->
      </div>
    </div>
    <!-- 文章 结束 -->

    <footers></footers>
  </div>
</template>

<script>
  import headers from './common/headers'
  import footers from './common/footers'
  export default {
    name: "articleInfo",
    components: {
      headers,
      footers
    },
    data() {
      return {
        // 登录用户
        clientName: '',
        // 文章id
        id:'',
        articleInfo: [],
        commentList: [],
        newComment: '',
      }
    },
    created() {
      this.clientName = sessionStorage.getItem('clientName');
      // console.log(this.clientName);
      this.id = this.$route.query.id;
      // console.log(this.id);
      this.getData();
      this.getCommentData();
    },
    mounted() {
      this.getCommentData();
    },
    methods: {
      // 获得文章详情
      getData() {
        $.ajax({
          url: '/api/home/notice/' + this.id,
          method: 'get',
          success: (res) => {
            this.articleInfo = res[0];
            this.articleInfo.date = this.articleInfo.date.substring(0,10);
            if (this.articleInfo.cover !== "") {
              this.articleInfo.cover = require('../../../server/upload/' + this.articleInfo.cover.split("\\")[1]);
            }
            // this.articleInfo.content = this.articleInfo.content.replace("\"","");
            // console.log(this.articleInfo)
          },
          error: (err) => {
            console.log(err)
          }
        })
      },

      // 获得文章评论详情
      getCommentData() {
        $.ajax({
          url: '/api/home/comment/' + this.id,
          method: 'get',
          success: (res) => {
            // console.log(res);
            this.commentList = res;
            for (let i=0; i<this.commentList.length; i++) {
              this.commentList[i].date = this.commentList[i].date.substring(0,10);
            }
            // console.log(this.commentList)
          },
          error: (err) => {
            console.log(err)
          }
        })
      },
      // 提交评论
      submit() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dates = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        let time = year + '-' + month + '-' + dates + ' ' + hour + ':' + minute + ':' + second;

        /*console.log(this.newComment);
        console.log(time);
        console.log(username);
        console.log(this.id);*/

        $.ajax({
          url:'/api/home/addComment',
          type:"post",
          data:{ articleId:this.id, content:this.newComment, author:this.clientName, date:time },
          dataType:"json",
          success: (res) => {
            // console.log(res);
            this.newComment = ''; //清空上次input框里的数据
            alert('提交成功！');
            this.$router.go(0);
          },
          error: (err) => {
            console.log(err)
          }
        });
      },
    }
  }
</script>

<style lang="less" scoped>
  .box {
    font-family: 'Microsoft YaHei', 'Arial';
    background: #f5f5f5;
    color: #555;
  }

  .article .container {
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 30px 40px 20px;
    background: #FFF;
  }

  /* 文章 */
  /* 文章标题 */
  .article-header {
    margin-bottom: 20px;

    h3 {
      line-height: 30px;
      transition: all 0.2s;
    }

    h3:hover {
      color: #ff7300;
    }
  }

  /* 文章信息 */
  .article-info {
    font-size: 12px;
    margin-top: 10px;
    overflow: hidden;

    span {
      float: left;
      padding-right: 6px;
      margin-right: 6px;
      position: relative;
    }

    /* 中间加竖线 */
    span:not(:last-child):after {
      content: '';
      width: 1px;
      height: 10px;
      position: absolute;
      right: 0;
      top: 3px;
      background: #3f434c;
    }

    .author {
      color: #ff7300;
    }
  }

  /* 图片 */
  .newsImg {
    text-align: center;
    margin-bottom: 20px;

    img {
      width: 600px;
      height: auto;
    }
  }

  /* 正文 */
  .article-content {
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 30px;

    p {
      font-size: 18px;
      line-height: 26px;
      padding: 8px 0;
      margin: 0;
    }

    table {
      width: 100%;
      border: 1px solid #b6b6b6;
    }
    tr td {
      height: 30px;
      border-bottom: 1px solid #b6b6b6;
      border-right: 1px solid #b6b6b6;
      padding: 0 10px 0 10px;
    }
  }
  /* 文章 结束 */

  /* 评论开始 */
  .article-comment {
    margin-top: 40px;

    h4 {
      font-size: 16px;
      font-weight: bolder;
      margin-bottom: 10px;
      padding-left: 0;
      color: #474747;
    }
  }

  textarea {
    border: 1px solid #ccc;
    outline: none;
    color: #555;
    font-family: inherit;
    padding: 10px;
  }

  .article-comment .comment {
    width: 100%;
    height: 60px;
    display: block;
  }

  .comment-form {
    margin-top: 15px;

    .items {
      overflow: hidden;
      margin: 10px 0;
    }

    span {
      float: left;
      width: 40px;
    }

    input[type="submit"] {
      width: 100px;
      height: 26px;
      cursor: pointer;
      outline: none;
    }

    p {
      color: #fd6262;
      font-weight: bold;
    }
  }

  .comment-list {
    margin-top: 30px;
  }

  .comment-content {
    line-height: 22px;
    margin-top: 5px;
  }
  /* 评论结束 */

  @media screen and (max-width: 510px){
    .article .container {
      padding: 30px 20px 20px 20px;
    }

    .article-content {
      font-size: 14px;
    }
  }
</style>
