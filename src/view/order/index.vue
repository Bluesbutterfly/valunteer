<template>
  <div>
    <!--<van-nav-bar-->
            <!--title="我的订单"-->
            <!--left-arrow-->
    <!--/>-->
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
        <van-cell v-for="(item,key) in list">
          <van-cell>
            订单号：<span>{{ item.orderId }}</span>
          </van-cell>
          <div class="van-order-list">
            <div>
              <div>{{ item.goodsName }}</div>
              <div>X {{ item.goodsCount }}</div>
            </div>
            <div>
              <img src="../../static/images/icon_weizhi.png"><div>{{ item.address }}</div>
            </div>
            <div>
              <img src="../../static/images/icon_shijian.png">{{ timeList[key] }}
            </div>
            <div>
              积分：<span>{{ item.totalIntegral }}</span>分
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
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
                id:1,
                orderId:0,
                goodsName:null,
                price:0,
                address:null,
                sellTime:[],
                rows:3,
                totalIntegral:0,
                goodsCount:0,
                isLoading: false,   //是否处于下拉刷新状态
                pageNumber: 1,
                totalPage: 0,
                timeList:[]//为解决iOS兼容时间算法问题
            };
        },
        methods: {
            init() {
                let data = {
                    pageNumber: this.pageNumber + 1
                };
                let self = this;
                let uid = this.$cookies.get("uid")
                this.$axios.post("/api/order/orderList",qs.stringify({ "id":uid,"page":self.pageNumber,"rows":this.rows })).then(res=>{
                    // let data = JSON.parse(res.request.serviceStation.response)
                    let serve = res.data.resData
                    let datas = serve.orderList;
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
                let uid = this.$cookies.get("uid")
                setTimeout(() => {
                    let data = {
                        pageNumber: self.pageNumber + 1
                    };
                    this.$axios.post("/api/order/orderList",qs.stringify({ "id":uid,"page":self.pageNumber,"rows":this.rows })).then(res=>{
                        console.log(res)
                        let serve = res.data.resData
                        // let data = JSON.parse(res.request.serviceStation.response)
                        let datas = serve.orderList;
                        self.list = self.list.concat(datas);
                        for (var i=0;i<self.list.length;i++){
                            let createTime = self.list[i].createTime
                            moment().format('YYYY-MM-DD HH:mm:ss')
                            let disTime = new Date(moment(createTime)).getMonth()-1+"月"+new Date(moment(createTime)).getDate()+"号"+" "+new Date(moment(createTime)).getHours()+":"+(new Date(moment(createTime)).getMinutes()<10?"0"+new Date(moment(createTime)).getMinutes():new Date(moment(createTime)).getMinutes())+":"+(new Date(moment(createTime)).getSeconds()<10?"0"+new Date(moment(createTime)).getSeconds():new Date(moment(createTime)).getSeconds())
                            if (disTime >= 24){
                                disTime = parseInt(disTime/24) + "天" + disTime%24
                            }
                            self.timeList.push(disTime)
                        }
                        self.totalPage = res.data.resData.count;
                        self.loading = false; //关闭下拉刷新效果
                        self.pageNumber++;
                        if (self.pageNumber-1 >= Math.ceil(self.totalPage/self.rows)) {
                            self.finished = true;
                        }
                    })
                }, 500);
            }
        }
    };
</script>

<style lang="less" scoped>
p{
  margin: 0;
}
.van{
  /*标题字体*/
  /deep/ &-nav-bar__title{
    font-size: .4rem;
  }
  &-cell{
    line-height: normal;
    margin-bottom: .2rem;
    padding: 0 .2rem;
    .van-cell{
      line-height: 1rem;
      font-size: .32rem;
      margin-bottom: .4rem;
      span{
        font-size: .28rem;
      }
    }
    .van-order-list{
      padding: 0 0.2rem;
      >div{
        display: flex;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        line-height: .5rem;
        color: #898989;
        font-size: .24rem;
        align-items: center;
        div{
          max-width: 60%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        img{
          height: .22rem;
          margin-right: .18rem;
        }
      }
      >div:first-child{
        justify-content: space-between;
        font-size: .32rem;
        margin-bottom: .2rem;
        div:last-child{
          font-size: .24rem;
        }
      }
      >div:last-child{
        justify-content: flex-end;
        color: #FD4242;
        margin: .2rem 0 .36rem;
      }
    }
  }
  &-list{
    margin: .4rem .4rem 0;
  }
 /deep/ &-nav-bar &-icon{
    color: #666;
  }
  &-cell-group{
    margin-bottom: .2rem;
  }
}
</style>
