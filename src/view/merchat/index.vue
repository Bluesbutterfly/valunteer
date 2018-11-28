<template>
  <div>
    <!--<van-nav-bar-->
            <!--title="商品详情"-->
            <!--left-arrow-->
    <!--/>-->
    <div v-if="showTip">
      <div class="img-tip-main">
        <ul>
          <li>
            <div class="sorts">1</div>
            <div class="img-button-intro">点击右上角的<img src="../../static/images/opens.png">按钮</div>
          </li>
          <li>
            <div class="sorts">2</div>
            <div class="img-button-intro">选择浏览器<img src="../../static/images/sarer.png">打开</div>
          </li>
        </ul>
      </div>
      <div class="img-bg-index"></div>
    </div>
    <div v-if="showMain">
      <van-cell-group>
        <img class="user-poster" :src="'http://47.99.140.207:8081/'+mapList.picture">
        <div class="van-user">
          <div class="van-shoping-name">
            {{ mapList.shopName }}
          </div>
          <div>
            {{ mapList.mapDistance }}<span>{{ mapList.address }}</span>
          </div>
          <div>
            <van-rate
                    v-model="value"
                    :size="12"
                    :goodsCount="5"
                    disabled-color="#ED7043"
                    void-color="#ceefe8"
                    disabled
            />
            <!--<span>2000</span>人去过-->
          </div>
          <div>
            <img src="../../static/images/icon_shijian.png">营业时间:<span class="van-timer-shop">{{ mapList.businessHours }}</span>
          </div>
        </div>
      </van-cell-group>
      <van-cell-group class="van-comment">
        <van-pull-refresh
                class="val-loading-contain"
                v-model="isLoading"
                @refresh="onRefresh"
        >
          <van-list
                  v-model="loading"
                  :finished="finished"
                  :loading-text="loadingText"
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
      </van-cell-group>
      <div class="spance"></div>
      <div class="mapSelect" v-if="mapShow">
        <ul>
          <li v-for="(item,index) in mapSelect"><van-button @click="selectMap(index,mapLat, mapLng, mapAddress)">{{ item }}</van-button></li>
        </ul>
        <van-button class="reset-button" @click="resets">取消</van-button>
      </div>
      <van-cell class="van-sure-primary">
        <div>
          <div><img src="../../static/images/icon_liuyan.png"></div>
          <div>留言</div>
        </div>
        <van-button size="large" @click="openMapApp">去这里</van-button>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell,List, CellGroup,NavBar,Rate,Button,PullRefresh } from 'vant';
import qs from 'qs'
import wx from 'weixin-js-sdk';
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Rate.name]: Rate,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [List.name]: List,
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [CellGroup.name]: CellGroup,
    [PullRefresh.name]: PullRefresh
  },
  data() {
      return {
          value: 5,
          mapList:{},
          browser:{},
          mapSelect:["百度地图","高德地图","腾讯地图","苹果地图"],
          mapShow:false,
          showTip:false,
          showMain:true,
          loadingText:"",
          list: [],
          loading: false,
          finished: false,
          isLoading: false,   //是否处于下拉刷新状态
          rows:6,//每页显示的个数
          pageNumber: 1,//当前显示页数
          totalPage: 0
      };
  },
  mounted:function(){
      // 获取浏览器信息
      this.browser = {
          ua : function() {
              var u = navigator.userAgent;
              var isChrome = u.match(/Chrome\/([\d.]+)/)
                  || u.match(/CriOS\/([\d.]+)/);
              var isAndroid = u.match(/(Android);?[\s\/]+([\d.]+)?/);
              var iosVersion = function() {
                  if (/iP(hone|od|ad)/.test(navigator.platform)) {
                      var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
                      return [ parseInt(v[1], 10), parseInt(v[2], 10),
                          parseInt(v[3] || 0, 10) ];
                  }
              }();
              var chromeVersion = function() {
                  var chrome = navigator.userAgent.match(/Chrome\/(\d+)\./);
                  if (chrome) {
                      return parseInt(chrome[1], 10);
                  }
              }();
              var ios9 = iosVersion && iosVersion[0] >= 9;
              var chrome18 = isChrome && isAndroid && chromeVersion
                  && chromeVersion > 18;
              return { // 移动终端浏览器版本信息
                  trident : u.indexOf('Trident') > -1, // IE内核
                  presto : u.indexOf('Presto') > -1, // opera内核
                  webKit : u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
                  gecko : u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
                  mobile : !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
                  iOS : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
                  android : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或uc浏览器
                  iPhone : u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
                  iPad : u.indexOf('iPad') > -1, // 是否iPad
                  webApp : u.indexOf('Safari') == -1, // 是否web应该程序，没有头部与底部
                  weChat : u.indexOf('MicroMessenger') > -1,
                  UC : u.indexOf('UCBrowser') > -1,
                  u3 : u.indexOf('U3') > -1,
                  chrome : u.indexOf('Chrome') > -1,
                  windowsPhone : u.indexOf("Windows Phone") > -1,
                  samsung : u.indexOf("Samsung") > -1,
                  QQ : (u.match(/\sQQ/i) != null ? u.match(/\sQQ/i).toLowerCase() == " qq"
                      : false),
                  isChrome : isChrome,
                  isAndroid : isAndroid,
                  iosVersion : iosVersion,
                  chromeVersion : chromeVersion,
                  ios9 : ios9,
                  chrome18 : chrome18
              };
          }()
      }
  },
  methods:{
      openMapApp() {
          this.mapShow = true
          this.showTip = true
          this.showMain = false
          window.location.href = "http://www.shhytjs.com/docs/index.html#/nav"+"?&mapAddress="+sessionStorage.mapAddress+"&mapLat="+sessionStorage.mapLats+"&mapLng="+sessionStorage.mapLngs
          // window.location.href = "//uri.amap.com/marker?position="+ lng + "," + lat
      },
      init() {
          let data = {
              pageNumber: this.pageNumber + 1
          };
          let self = this;
          this.$axios.post("/api/shop/myGoods",qs.stringify({ "id":this.$route.query.list,"page":self.pageNumber,"rows":this.rows })).then(res=>{
              // let data = JSON.parse(res.request.serviceStation.response)
              let serve = res.data.resData
              let datas = serve.myGoodsList;
              self.list = datas;
              console.log(self.list)
              self.totalPage = res.data.resData.goodsCount/this.rows;
              self.isLoading = false; //关闭下拉刷新效果
          }).catch(err=>{
              this.loadingText = "对不起！该商店没有任何商品"
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
              this.$axios.post("/api/shop/myGoods",qs.stringify({ "id":this.$route.query.list,"page":self.pageNumber,"rows":this.rows })).then(res=>{
                  console.log(res)
                  this.loadingText = "加载中"
                  let serve = res.data.resData
                  // let data = JSON.parse(res.request.serviceStation.response)
                  let datas = serve.myGoodsList;
                  let maps = serve.myShop
                  self.list = self.list.concat(datas);
                  self.mapList = maps;
                  console.log(self.mapList)
                  self.totalPage = res.data.resData.goodsCount/this.rows;
                  self.loading = false; //关闭下拉刷新效果
                  self.pageNumber++;
                  if (self.pageNumber-1 >= Math.ceil(self.totalPage)) {
                      self.finished = true;
                  }
              }).catch(err=>{
                  this.loadingText = "对不起！该商店没有任何商品"
              })
          }, 500);
      },
      // 进入购买详情的页面
      details(index) {
          sessionStorage.shopIndexId = this.list[index].id
          sessionStorage.shopPic = 'http://47.99.140.207:8081/'+this.list[index].picture
          this.$router.push({name:'commodityDetails',query:this.list[index].id})
      }
  }
};
</script>

<style lang="less" scoped>
p{
  margin: 0;
}
.van{
  &-cell{
    padding: .2rem .3rem;
    line-height: normal;
  }
  /*返回图标*/
  /deep/&-nav-bar &-icon{
    color: #666;
  }
  /*标题字体*/
  /deep/&-nav-bar__title{
    font-size: .4rem;
  }
  &-cell-group{
    margin-bottom: .2rem;
  }
  &-user{
    padding: .4rem;
    >div{
      line-height: .6rem;
      display: flex;
      align-items: center;
      white-space: nowrap;
      span{
        margin-left: .3rem;
      }
      .van-timer-shop{
        margin-left: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      img{
        width: .22rem;
        height: .22rem;
        margin-right: .22rem;
      }
    }
    /*商户名称*/
    .van-shoping-name{
      font-size: .42rem;
      color: #302F2F;
      line-height: normal;
      padding-bottom: .6rem;
    }
  }
  /*评论*/
  &-list{
    /deep/
    .van-item-list {
      float: left;
      width: 50%;
      padding: 0.2rem 0.2rem 0 0.2rem;
      box-sizing: border-box;
      .van-cell{
        font-size: 0.28rem;
        line-height: 0.48rem;
        padding: 0.2rem 0.3rem;
        img {
          width: 100%;
          height: 3rem;
          object-fit: contain;
        }
      }
    }
  }
  /*留言*/
  &-sure-primary{
    position: fixed;
    bottom: 0;
    padding: 0;
    /deep/ .van-cell__value--alone{
      display: flex;
      justify-content: space-between;
      button{
        width: 6.22rem;
        height: 1.02rem;
        background-color: #58BF8A;
        border: #58BF8A;
        color: #fff;
        font-size: .28rem;
      }
      >div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 auto;
        font-size: .24rem;
        color: #434343;
      }
    }
    img{
      width: .36rem;
      height: .3rem;
      display: block;
      margin: 0 auto;
      padding-bottom: .1rem;
    }
  }
}
.user-poster{
  width: 100%;
  height: 4.34rem;
  object-fit: cover;
}
.spance{
  height: .1rem;
}
/*地图选择*/
.mapSelect{
  position: fixed;
  bottom: 1.02rem;
  width: 80%;
  left: 10%;
  button{
    width: 100%;
    padding: 0;
    background-color: #fff;
    color: #333;
    border: 1px solid #e5e5e5;
  }
  .reset-button{
    margin-bottom: .1rem;
  }
  ul{
    margin-bottom: .2rem;
  }
}
  //地图提示
.img-bg-index{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #000;
  opacity: 0.6;
  z-index: -1;
}
.img-tip-main{
  position: fixed;
  top: 30%;
  left:.4rem;
  z-index: 99;
  ul{
    li{
      display: flex;
      color: #fff;
      line-height: .4rem;
      margin: .2rem 0;
      .sorts{
        height: .4rem;
        width: .4rem;
        border-radius: 50%;
        background-color: orangered;
        text-align: center;
      }
      .img-button-intro{
        padding-left: .3rem;
        img{
          display: inline-block;
          float: right;
          padding-left: .1rem;
        }
      }
    }
  }
}
</style>
