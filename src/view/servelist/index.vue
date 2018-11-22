<template>
  <div class="contain">
    <!--<van-nav-bar-->
            <!--title="服务活动"-->
    <!--/>-->

    <div class="val-loading-contain">
      <van-pull-refresh
              class="val-loading-contain"
              v-model="isLoading"
              @refresh="onRefresh"
      >
        <van-list
                v-model="loading"
                :finished="finished"
                @load="onLoad"
        >
          <van-cell v-for="(item,index) in list" @click="signUp(item,index)">
            <div class="val-area">
              <div>
                <img src="../../static/images/img_logo.png">
              </div>
              <div class="val-area-cen">{{ item.stationName }}</div>
              <div class="val-timer">{{ timeList[index] }}小时前</div>
            </div>
            <div class="val-img-center">
              <img :src="'http://47.99.140.207:8081/'+item.picture">
            </div>
            <div class="val-text-itroduce">
              {{ item.content }}
            </div>
            <div class="val-info-oth">
              <!--<div>-->
                <!--&lt;!&ndash;<img src="../../static/images/icon_dingwei.png">&ndash;&gt;-->
                <!--&lt;!&ndash;<span>{{ item.distance }}</span>&ndash;&gt;-->
              <!--</div>-->
              <div>
                <img src="../../static/images/icon_weizhi.png">
                <span>{{ item.address }}</span>
              </div>
              <div>
                <img src="../../static/images/icon_renshu.png">
                <span><span>{{ item.peopleCount - item.entryCount }}</span>/<span>{{ item.peopleCount==null?0:item.peopleCount }}</span>人</span>
              </div>
            </div>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup,NavBar,Card,List,PullRefresh } from 'vant';
import qs from 'qs'
import moment from 'moment'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [List.name]: List,
    [Card.name]: Card,
    [NavBar.name]: NavBar,
    [CellGroup.name]: CellGroup,
    [PullRefresh.name]: PullRefresh
  },
  data() {
      return {
          list: [],
          loading: false,
          finished: false,
          rows:3,
          isLoading: false,   //是否处于下拉刷新状态
          pageNumber: 1,
          totalPage: 0,
          timeList:[]
      };
},
  methods: {
      init() {
          let data = {
              pageNumber: this.pageNumber + 1
          };
          let self = this;
          this.$axios.post("/api/activity/activityList",qs.stringify({ "page":self.pageNumber,"rows":this.rows })).then(res=>{
              // let data = JSON.parse(res.request.serviceStation.response)
              let serve = res.data.resData
              let datas = serve.activityList;
              self.list = datas;
              self.totalPage = res.data.resData.count;
              self.isLoading = false; //关闭下拉刷新效果
          })
      },
      //下拉刷新
      onRefresh() {
          let self = this;
          setTimeout(() => {
              self.totalPage = 0;
              self.pageNumber = 0;
              self.init(); //加载数据
          }, 500);
      },
      //页面初始化之后会触发一次，在页面往下加载的过程中会多次调用【上拉加载】
      onLoad() {
          let self = this;
          setTimeout(() => {
              let data = {
                  pageNumber: self.pageNumber + 1
              };
              this.$axios.post("/api/activity/activityList",qs.stringify({ "page":self.pageNumber,"rows":this.rows })).then(res=>{
                  console.log(res)
                  let serve = res.data.resData
                  // let data = JSON.parse(res.request.serviceStation.response)
                  let datas = serve.activityList;
                  self.list = self.list.concat(datas);
                  self.totalPage = res.data.resData.count;
                  for (var i=0;i<self.list.length;i++){
                      let createTime = self.list[i].createTime
                      moment().format('YYYY/MM/DD h:mm:ss')
                      let disTime = Math.floor((moment()-moment(createTime)) / (24 * 3600 * 1000))*24+Math.floor((moment()-moment(createTime))%(24*3600*1000)/(3600*1000))
                      if (disTime >= 24){
                          disTime = parseInt(disTime/24) + "天" + disTime%24
                      }
                      self.timeList.push(disTime)
                  }
                  self.loading = false; //关闭下拉刷新效果
                  self.pageNumber++;
                  if (self.pageNumber-1 >= Math.ceil(self.totalPage)) {
                      self.finished = true;
                  }
              })
          }, 500);
      },
      signUp(item,index){
          sessionStorage.content = item.content
          sessionStorage.createTime = item.createTime
          sessionStorage.address = item.address
          sessionStorage.activityId = item.id
          sessionStorage.picSrc = 'http://47.99.140.207:8081/'+item.picture
          this.$router.push({name:'act'})
      }
  }
};
</script>

<style lang="less" scoped>
.contain{
  background-color: #fff;
  min-height: 100vh;
}
.van{
  /*标题字体*/
  /deep/ &-nav-bar__title{
    font-size: .4rem;
  }
  /deep/ &-nav-bar__text{
    color: inherit;
    font-size: .28rem;
  }
}
.van-cell{
  font-size: .28rem;
  line-height: .48rem;
  padding: .44rem .6rem;
}
.user {
  &-poster {
    width: 7.5rem;
    height: 4rem;
    display: block;
  }

  &-group {
    margin-bottom: .3rem;
  }

  &-links {
    padding: 15px 0;
    font-size: .24rem;
    text-align: center;
    background-color: #fff;

    .van-icon {
      display: block;
      font-size: .48rem;
    }
  }
}
.val{
  &-persnal-title{
    height: 2.74rem;
    position: relative;
    top: -.91rem;
    .val-img-title{
      width: 1.82rem;
      height: 1.82rem;
      margin: 0 auto;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  &-vitrl-name{
    text-align: center;
    padding-top: .1rem;
    font-size: .32rem;
    color: #666666;
  }
  &-info{
    display: flex;
    justify-content: center;
    padding-top: .2rem;
    >div{
      display: inline-block;
      padding-right: .36rem;
      font-size: .28rem;
      color: #CCCCCC;
      img{
        width: .24rem;
        padding-right: .1rem;
      }
    }
  }
}
.val-loading-contain{
 overflow: hidden;
  .van-cell__value--alone{
    padding: .4rem .6rem;
    .val-area{
      height: .42rem;
      line-height: .42rem;
      >div{
        height: 100%;
        float: left;
        img{
          height: 100%;
        }
      }
      .val-area-cen{
        padding-left: .1rem;
        font-size: .28rem;
        color: #282828;
      }
      .val-timer{
        font-size: .24rem;
        color: #B5B6B7;
        float: right;
      }
    }
    .val-img-center{
      margin: .2rem 0;
      height: 4.74rem;
      img{
        width: 100%;
        height: 100%;
        border-radius: 8px;
        object-fit: cover;
      }
    }
  }
  .val-text-itroduce{
    font-size: .42rem;
    color: #302F2F;
  }
  .val-info-oth{
    padding-top: .2rem;
    display: flex;
    justify-content: space-between;
    >div{
      float: left;
      img{
        width: .22rem;
        padding-right: .1rem;
      }
      span{
        font-size: .24rem;
        color: #C3C4C5;
      }
    }
  }
}
</style>
