<template>
  <div>
    <!--<van-nav-bar-->
            <!--title="商品列表"-->
    <!--/>-->
  <div id="list-content">
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
        <div v-for="(item,index) in list" class="van-item-list" @click="details(index)" :data-id="item.id">
          <!--商品图片-->
          <van-cell class="van-commodity-img">
            <img :src="'http://47.99.140.207:8081/'+item.picture">
          </van-cell>
          <!--商品详情-->
          <van-cell class="van-commodity-more">
            <div :title="item.presentation">{{ item.goodsName }}</div>
            <div>
              <div>积分：<span>{{ item.price }}</span></div>
              <div>剩余：<span>{{ item.inventory }}</span></div>
            </div>
          </van-cell>
        </div>
      </van-list>
    </van-pull-refresh>
    <div class="van-listimg-btn" @click="targetTop">
      <img src="../../static/images/icon_shangjiantou.png">
    </div>
  </div>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup,NavBar,Card,List,PullRefresh } from 'vant';
import qs from 'qs'

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
          isLoading: false,   //是否处于下拉刷新状态
          rows:6,//每页显示的个数
          pageNumber: 1,//当前显示页数
          totalPage: 0
      };
  },

  methods: {
      init() {
          let data = {
              pageNumber: this.pageNumber + 1
          };
          let self = this;
          this.$axios.post("/api/goods/goodsList",qs.stringify({ "page":self.pageNumber,"rows":this.rows })).then(res=>{
              // let data = JSON.parse(res.request.serviceStation.response)
              let serve = res.data.resData
              let datas = serve.goodsList;
              self.list = datas;
              self.totalPage = res.data.resData.count/this.rows;
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
              this.$axios.post("/api/goods/goodsList",qs.stringify({ "page":self.pageNumber,"rows":this.rows })).then(res=>{
                  console.log(res)
                  let serve = res.data.resData
                  // let data = JSON.parse(res.request.serviceStation.response)
                  let datas = serve.goodsList;
                  self.list = self.list.concat(datas);
                  self.totalPage = res.data.resData.count/this.rows;
                  self.loading = false; //关闭下拉刷新效果
                  self.pageNumber++;
                  if (self.pageNumber-1 >= Math.ceil(self.totalPage)) {
                      self.finished = true;
                  }
              })
          }, 500);
      },
      // 进入购买详情的页面
      details(index) {
          sessionStorage.shopIndexId = this.list[index].id
          sessionStorage.shopPic = 'http://47.99.140.207:8081/'+this.list[index].picture
          this.$router.push({name:'commodityDetails',query:this.list[index].id})
      },
      // 返回顶部
      targetTop() {
          document.body.scrollTop = 0
          document.documentElement.scrollTop = 0
      }
  },
    mounted(){
        let winHeight = document.documentElement.clientHeight                          //视口大小
        document.getElementById('list-content').style.height = (winHeight - 46) +'px'  //调整上拉加载框高度
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
  padding: .2rem .3rem;
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
  &-list{
    overflow: hidden;
  }
  /deep/ &-item-list{
    float: left;
    width: 50%;
    padding: .2rem .2rem 0 .2rem;
    box-sizing: border-box;
    .van-commodity-img{
      img{
        width: 100%;
        height: 3rem;
        object-fit: contain;
      }
    }
    .van-commodity-more{
        >div{
            >div:first-child{
                font-size: .24rem;
                color: #666;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            >div:last-child{
                display: flex;
                justify-content: space-between;
                font-size: .2rem;
                color: #999;
                >div:first-child{
                    color: #FD4242;
                }
            }
        }
    }
  }
  &-item-list:nth-child(even){
      padding-left: 0;
  }
  &-listimg-btn{
      position: fixed;
      right: .64rem;
      bottom: .76rem;
      width: 1.02rem;
      height: 1.02rem;
      img{
          width: 100%;
          height: 100%;
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
</style>
