<template>
    <div>
      <ul class="timeline">
        <li v-for="(item, index) in notice" :key="index">
          <div class="time">{{item.date.substring(0,10)}}</div>
          <div class="dot"></div>
          <div class="info">
            <div>
              <router-link :to="{path:'/home/articleInfo', query:{id: item.aid}}">{{item.title}}</router-link>
            </div>
          </div>
        </li>
        <!--<li>
          <div class="time">2020-05-06</div>
          <div class="dot"></div>
          <div class="info">
            <div>
              <a href="">我校国际学生热议习近平总书记给巴基斯坦留</a>
            </div>
          </div>
        </li>-->
      </ul>
    </div>

</template>

<script>
  export default {
    name: 'Timeline',
    data() {
      return {}
    },
    props: {
      notice: {
        type: Array,
        default:null
      }
    },
    mounted() {

    }
  }
</script>

<style>
  .timeline {
    list-style-type: none;
    background: url("../assets/img/line.png") repeat-y scroll 100px 0 transparent;
    margin: 30px 0;
    padding: 0;
  }

  .timeline li {
    position: relative;
    margin-bottom: 20px;
  }

  /* 时间 */
  .timeline li .time {
    position: absolute;
    width: 90px;
    text-align: right;
    left: 0;
    top: 10px;
    color: #999;
  }

  /* 圆点 */
  .timeline li .dot {
    position: absolute;
    background: url("../assets/img/spot.png") no-repeat scroll 0 0 transparent;
    width: 56px;
    height: 56px;
    top: -10px;
    left: 90px;
    line-height: 56px;
    text-align: center;
    color: #fff;
    font-size: 18px;
  }

  /* 内容*/
  .timeline li .info {
    margin-left: 120px;
    padding-bottom: 10px;

  }

  .timeline li .info div {
    background-color: #a7c2d3;
    padding: 10px;
    color: #fff;
    font-size: 13px;
    line-height: 20px;
    margin-right: 10px;
  }

  a {
    color: #646464;
    font-size: 14px;
  }

</style>
