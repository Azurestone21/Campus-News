<template>
  <div>
    <!--头部-->
    <headers></headers>
    <!--头部 结束-->

    <!--学校要闻-->
    <div id="focusNews">
      <div class="title">
        <div class="content">
          <h4>学校要闻</h4>
          <span class="more">
            <router-link :to="{path:'/home/more', query:{sort: '学校要闻'}}">更多 </router-link>
          </span>
        </div>
      </div>
      <div class="news">
        <div class="content">
          <div class="list">
            <ul>
              <li v-for="(item, index) in focusNews" :key="index">
                <router-link :to="{path:'/home/articleInfo', query:{id: item.aid}}">{{item.title}}</router-link>
              </li>
              <!--<li><a href="">王企鹅会空很大手机号多少卡号的擦会计初级爱看错吧擦不王企鹅会空很大手机号多少卡号的擦吃亏祭敖包</a></li>-->
            </ul>
          </div>
          <div class="exhibition">
            <div id="exhibit">
              <img class="bigItem" src="../../assets/img/item1.jpg" alt="">
            </div>
            <div class="items">
              <img class="item" src="../../assets/img/item1.jpg" alt="">
              <img class="item" src="../../assets/img/item2.jpg" alt="">
              <img class="item" src="../../assets/img/item3.jpg" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--学校要闻 结束-->

    <div class="wrap">
      <div class="content">
        <!-- 校园快讯 -->
        <div id="newsFlash">
          <div class="title">
            <div class="content">
              <h4>校园快讯</h4>
              <span class="more">
                <router-link :to="{path:'/home/more', query:{sort: '校园快讯'}}">更多 </router-link>
              </span>
            </div>
            <div class="list">
              <ul>
                <li v-for="(item, index) in newsFlash" :key="index">
                  <span class="No">{{index+1}}</span>
                  <span>
                    <!--<a href="" class="headline">{{item.title}}</a>-->
                    <router-link class="headline" :to="{path:'/home/articleInfo', query:{id: item.aid}}">{{item.title}}</router-link>
                    <span class="date">{{item.date.substring(0,10)}}</span>
                  </span>
                </li>
                <!--<li>
                  <span class="No">2</span>
                  <span>
                    <a href="" class="headline">撒看得见哈会计核算撒看得见哈会计核算科科技城卡车科技城</a>
                    <span class="date">2020-05-06</span>
                  </span>
                </li>-->
              </ul>
            </div>
          </div>

        </div>
        <!--校园快讯 结束-->

        <!--通知公告-->
        <div id="notice">
          <div class="title">
            <div class="content">
              <h4>通知公告</h4>
              <span class="more">
                <router-link :to="{path:'/home/more', query:{sort: '通知公告'}}">更多 </router-link>
              </span>
            </div>
          </div>
          <div class="list">
            <timeline :notice="notice"></timeline>
          </div>
        </div>
        <!--通知公告 结束-->
      </div>
    </div>

    <!-- 尾部 -->
    <footers></footers>
    <!-- 尾部 结束 -->
  </div>
</template>

<script>
  import headers from './common/headers';
  import footers from './common/footers';
  import timeline from "../../components/timeline";
  export default {
    name: "index",
    components: {
      headers,
      footers,
      timeline
    },
    data() {
      return {
        articleList: [],
        focusNews: [],
        newsFlash: [],
        notice: [],
      }
    },
    mounted() {
      this.mouseHover();
      this.getData();
    },
    methods: {
      // 图片鼠标事件
      mouseHover() {
        let bigItem = document.getElementsByClassName('bigItem')[0];
        let items = document.getElementsByClassName('item');
        for (let i=0; i<items.length; i++) {
          items[i].addEventListener('mouseenter', function () {
            bigItem.src = items[i].src;
          })
        }
      },

      // 获得文章信息
      getData() {
        $.ajax({
          url: '/api/home/articleList',
          method: 'get',
          success: (res) => {
            this.articleList = res;
            // 更改图片路径
            for (let i=0; i<this.articleList.length; i++) {
              // 动态绑定图片路径需要用 require 包裹
              if (this.articleList[i].cover !== '') {
                this.articleList[i].cover = require('../../../server/upload/' + this.articleList[i].cover.split("\\")[1]);
              }
            }
            // 逆转，时间最新的排前面
            this.articleList.reverse();
            // console.log(this.articleList.reverse())

            // 分类
            let a = 0;
            let b = 0;
            let c = 0;
            for (let i=0; i<this.articleList.length; i++) {
              if (this.articleList[i].sort === '学校要闻' && a<6) {
                a++;
                this.focusNews.push(this.articleList[i]);
              }
              if (this.articleList[i].sort === '校园快讯' && b<6) {
                b++;
                this.newsFlash.push(this.articleList[i]);
              }
              if (this.articleList[i].sort === '通知公告' && c<5) {
                c++;
                this.notice.push(this.articleList[i]);
              }
            }
            // console.log(this.focusNews);
            // console.log(this.newsFlash);
            // console.log(this.notice)
          },
          error: (err) => {
            console.log(err)
          }
        })
      },
    }
  }
</script>

<style lang="less" scoped>
  ul {
    background-color: transparent;
  }
  .content {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    display: flex;
  }
  h4 {
    flex: 1;
    font-size: 18px;
    line-height: 30px;
    color: #279fc2;
  }
  .more {
    line-height: 50px;
    flex: 1;
    text-align: right;
    padding-right: 20px;
  }

  /* 要闻 */
  #focusNews {
    margin-top: 20px;
    .news {
      width: 100%;
      height: 300px;

      .content {
        background-color: #fafafa;
      }

      .list {
        flex: 1;
        padding: 0;
        ul {
          list-style: disc;
          padding: 10px 10px 0 20px;
          list-style-position: inside;
        }
        li {
          height: 40px;
          line-height: 40px;
          overflow: hidden;
        }
        a {
          color: #646464;
        }
      }

      .exhibition {
        flex: 1;
        margin: 10px;

        #exhibit {
          width: 80%;
          height: 100%;
          float: left;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .items {
          width: 20%;
          height: 100%;
          background-color: #c6c6c6;
          text-align: center;
          float: left;

          img {
            width: 95%;
            height: 31.3%;
            margin-top: 5%;
            opacity: 0.6;
          }

          img:hover {
            opacity: 1;
          }
        }
      }
    }
  }
  /* 要闻 结束 */

  /* 快讯 通知*/
  .wrap {
    display: flex;
    margin-top: 30px;
    margin-bottom: 60px;

    /* 校园快讯 */
    #newsFlash {
      flex: 3;

      .content {
        width: 100%;
        display: flex;
      }

      .list {
        height: 375px;
        background-color: #eeeeee;

        ul {
          list-style: none;
          padding: 10px;
        }
        li {
          display: flex;
          margin-bottom: 10px;
          background-color: #fff;
        }
        span {
          display: inline-block;
        }
        span:nth-child(1) {
          min-width: 50px;
        }

        .No {
          width: 50px;
          height: 50px;
          background-color: #0a95ff;
          font-size: 32px;
          font-weight: bolder;
          color: #fff;
          text-align: center;
          line-height: 50px;
        }

        .headline {
          display: block;
          padding: 0 0 0 5px;
          height: 30px;
          line-height: 30px;
          overflow: hidden;
          color: #000000;
        }
        .date {
          padding-left: 5px;
          display: block;
          color: #999999;
        }
      }
    }
    /* 校园快讯 结束 */

    /* 公告通知 */
    #notice {
      flex: 2;

      .content {
        width: 100%;
        display: flex;
      }

      .list {
        height: 375px;
        overflow: hidden;
        border: 1px solid #eeeeee;
        border-left: none;
      }
    }
    /* 公告通知 结束 */
  }
  /* 快讯 通知 结束 */


  @media screen and (max-width: 1200px) {
    .content {
      width: 100%;
    }
    h4 {
      padding-left: 20px;
    }
  }

  @media screen and (max-width: 740px) {
    #focusNews {
      .exhibition {
        display: none;
      }
    }

    .wrap {
      .content {
        display: block;
        #notice {
          margin-top: 40px;
        }
      }
    }
  }

  @media screen and (max-width: 510px) {
    #focusNews {
      .news {
        .list {
          ul {
            padding: 10px 10px 0 15px;
          }
        }
      }
    }
  }
</style>
