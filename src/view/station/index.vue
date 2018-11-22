<template>
  <div>
    <!--<van-nav-bar-->
            <!--title="志愿者服务站"-->
            <!--right-text="发布"-->
    <!--/>-->
    <van-cell-group class="van-cell-top">
      <van-row type="flex" justify="center" class="van-top-img">
        <img src="../../static/images/img_logo.png">
      </van-row>
      <van-row type="flex" justify="center" class="van-top-title">
        {{ stationName }}
      </van-row>
      <van-row type="flex" justify="center" class="van-top-temp">
        让城市更有温度
      </van-row>
      <van-row type="flex" justify="center" class="van-top-rote">
        {{ maddress }}
      </van-row>
    </van-cell-group>
    <van-cell-group class="van-cell-top">
      <div class="van-containant">
        <span>服务站介绍</span>
        <p>{{ presentation }}</p>
      </div>
    </van-cell-group>
    <van-cell-group class="van-containant">
        <span>活动列表</span>
      <van-list
              v-model="loading"
              :finished="finished"
              @load="onLoad"
      >
        <div v-for="(item,index) in list" class="van-lists">
          <div class="van-img-list">
            <img :src="'http://47.99.140.207:8081/'+item.picture">
          </div>
          <div class="van-intro-list">
            <div>{{ item.title }}</div>
            <div>
              <img src="../../static/images/icon_renshu.png">
              <span><span>{{ item.peopleCount - item.entryCount }}</span>/<span>{{ item.peopleCount==null?0:item.peopleCount }}</span>人</span>
            </div>
            <div>
              <img src="../../static/images/icon_weizhi.png">
              <span>{{ item.address }}</span>
            </div>
            <div>
              <img src="../../static/images/icon_shijian.png">
              <span>{{ start[index] }}</span>
            </div>
          </div>
        </div>
      </van-list>
    </van-cell-group>
    <div class="van-space-wite"></div>
    <van-cell class="van-sure-primary">
      <van-button size="large" @click="sureGift">发布活动</van-button>
    </van-cell>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup,NavBar,List,Button } from 'vant';
import qs from 'qs'
import moment from 'moment'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [List.name]: List,
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [CellGroup.name]: CellGroup
  },
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            stationName:null,
            presentation:null,
            stationId:null,
            isLoading: false,   //是否处于下拉刷新状态
            page:0,//当前显示页数
            rows:3,//每页显示的个数
            createTime:null,
            address:null,
            maddress:null,
            pageNumber: 1,
            totalPage: 0,
            start:[],
            end:[]
        };
    },

    methods: {
        init() {
            let data = {
                pageNumber: this.pageNumber + 1
            };
            let self = this;
            this.$axios.post("/api/serviceStation/serviceStationDetail",qs.stringify({ "id":sessionStorage.cgid,"page":self.pageNumber,"rows":this.rows })).then(res=>{
                // let data = JSON.parse(res.request.serviceStation.response)
                let serve = res.data.resData.serviceStation
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
                this.$axios.post("/api/serviceStation/serviceStationDetail",qs.stringify({ "id":sessionStorage.cgid,"page":self.pageNumber,"rows":this.rows })).then(res=>{
                    let serve = res.data.resData.serviceStation
                    this.stationName = serve.stationName
                    this.presentation = serve.presentation
                    this.stationId = serve.stationId
                    this.createTime = serve.createTime
                    sessionStorage.stationName = serve.stationName
                    sessionStorage.presentation = serve.presentation
                    sessionStorage.stationId = serve.stationId
                    sessionStorage.createTime = serve.createTime
                    this.maddress = serve.stationAddress
                    // let data = JSON.parse(res.request.serviceStation.response)
                    let datas = serve.activityList;
                    self.list = self.list.concat(datas);
                    for (var i=0;i<datas.length;i++){
                        let day = new Date(moment(datas[i].startTime)).getDay()
                        let day1 = new Date(moment(datas[i].endTime)).getDay()
                        switch (day){
                            case 1:
                                day = "星期一"
                                break;
                            case 2:
                                day = "星期二"
                                break;
                            case 3:
                                day = "星期三"
                                break;
                            case 4:
                                day = "星期四"
                                break;
                            case 5:
                                day = "星期五"
                                break;
                            case 6:
                                day = "星期六"
                                break;
                            case 7:
                                day = "星期日"
                                break;
                        }
                        switch (day1){
                            case 1:
                                day = "星期一"
                                break;
                            case 2:
                                day = "星期二"
                                break;
                            case 3:
                                day = "星期三"
                                break;
                            case 4:
                                day = "星期四"
                                break;
                            case 5:
                                day = "星期五"
                                break;
                            case 6:
                                day = "星期六"
                                break;
                            case 7:
                                day = "星期日"
                                break;
                        }
                        moment().format('YYYY/MM/DD h:mm:ss')
                        this.start.push(new Date(moment(datas[i].startTime)).getMonth()+"月"+new Date(moment(datas[i].startTime)).getDate()+"日"+" "+day+" "+new Date(moment(datas[i].startTime)).getHours()+":"+new Date(moment(datas[i].startTime)).getMinutes()+":"+new Date(moment(datas[i].startTime)).getSeconds())
                        this.end = new Date(moment(datas[i].endTime)).getMonth()+"月"+new Date(moment(datas[i].endTime)).getDate()+"日"+" "+day1+" "+new Date(moment(datas[i].endTime)).getHours()+":"+new Date(moment(datas[i].endTime)).getMinutes()+":"+new Date(moment(datas[i].endTime)).getSeconds()
                        // console.log(this.start)
                    }

                    self.totalPage = res.data.resData.count;
                    self.loading = false; //关闭下拉刷新效果
                    self.pageNumber++;
                    if (self.pageNumber-1 >= Math.ceil(self.totalPage/self.rows)) {
                        self.finished = true;
                    }
                    console.log(res)
                })
            }, 500);
        }
      ,
        sureGift(){
            this.$router.push({name:'release'})
        }
    },
    beforeCreate:function(){
        let gid = this.$cookies.get("gid"),
            servePhone = this.$cookies.get("servePhone")
        sessionStorage.cgid = gid
        if (!gid){
            this.$router.push({name:'loginss'})
        }
        // this.$axios.post("/api/loginStatus/userStatus",qs.stringify({ "userStatus":3,"phone":servePhone })).then(res=>{
        //     console.log(res.data.resData)
        //
        // })
    }
};
</script>

<style lang="less" scoped>
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
}
.van-cell-top{
  margin-bottom: .2rem;
  padding: .88rem 0 .41rem;
  .van-top-img{
    img{
      width: 1.26rem;
      height: 1.26rem;
    }
  }
  .van-top-title{
    font-size: .42rem;
    padding-top: .26rem;
  }
  .van-top-temp{
    font-size: .28rem;
    padding-top: .2rem;
  }
  .van-top-rote{
    font-size: .24rem;
    padding-top: .2rem;
    color: #898989;
  }
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
.van{
  /deep/ &-cell__value--alone{
    display: flex;
    flex-flow: row;
  }
  &-containant{
    padding: .4rem;
    font-size: .32rem;
    span{
      display: inline-block;
      padding-bottom: .8rem;
    }
    p{
      margin: 0;
      font-size: .24rem;
      color: #898989;
    }
  }
  /*活动列表开始*/
  &-img-list{
    width: 2.52rem;
    height: 1.9rem;
    margin-right: .4rem;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &-intro-list{
    flex: 1;
    >div{
      font-size: .24rem;
      padding-top: .2rem;
      line-height: 0;
      img{
        height: .22rem;
        padding-right: .18rem;
      }
      span{
        padding: 0;
      }
    }
    >div:first-child{
      font-size: .32rem;
      line-height: normal;
      padding: 0;
    }
    >div:nth-child(2){
      padding-top: .25rem;
    }
  }
  &-list{
    /deep/ .van-lists{
      padding: 0;
      margin-bottom: .8rem;
      display: flex;
    }
  }
  &-sure-primary{
    position: fixed;
    bottom: 0;
    left: 0;
    height: 1rem;
    line-height: 1rem;
    padding: 0;
    button{
      float: right;
      height: 100%;
      border-radius: 0;
      background-color: #58BF8A;
      border: 1px solid #58BF8A;
      color: #fff;
      padding: 0 .4rem;
      font-size: .36rem;
    }
  }
  &-space-wite{
    height: 1rem;
    background-color: transparent;
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
</style>
