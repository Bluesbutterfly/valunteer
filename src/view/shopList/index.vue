<template>
  <div>
    <!--<van-nav-bar-->
            <!--title="商品列表"-->
    <!--/>-->
  <div id="list-content">
    <!--分类查询-->
    <div class="sort-search">
      <van-cell-group>
        <van-search
                v-model="value"
                placeholder="请输入搜索关键词"
                show-action
                @search="onSearch"
                @cancel="onCancels"
        >
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
      </van-cell-group>
      <div class="sort-search-contant">
        <div class="search-item" @click="sortSearch(index)" v-for="(item,index) in sortList">
          {{ item }}
          <i class="iconfont icon-xialajiantou"></i>
        </div>
        <van-popup v-model="show" position="center" :overlay="true">
          <van-picker :columns="columns" show-toolbar v-if="columnsShow" @cancel="onCancel" @confirm="onConfirm" class="sort-select"/>
        </van-popup>
      </div>
    </div>
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
      <el-amap vid="amap" :plugin="plugin" :amap-manager="amapManager" class="amap-demo" :center="center" :zoom="zoom" style="display: none">
      </el-amap>
  </div>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup,NavBar,Card,List,Field,PullRefresh,Search,Picker,Popup } from 'vant';
import qs from 'qs'
import Vue from 'vue'
import VueAMap from 'vue-amap';
import '../../static/font_934567_8ze40dr96e7/iconfont.css'
Vue.use(VueAMap);
// 初始化vue-amap
let amapManager = new VueAMap.AMapManager();
// let map = new VueAMap.Map()
VueAMap.initAMapApiLoader({
    // 高德key
    key: '445aa0fada938fa756d8a9c9e7996531',
    // 插件集合 （插件按需引入）
    plugin: [
        "AMap.Autocomplete", //输入提示插件
        "AMap.PlaceSearch", //POI搜索插件
        "AMap.Scale", //右下角缩略图插件 比例尺
        "AMap.OverView", //地图鹰眼插件
        "AMap.ToolBar", //地图工具条
        "AMap.MapType", //类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
        "AMap.PolyEditor", //编辑 折线多，边形
        "AMap.CircleEditor", //圆形编辑器插件
        "AMap.Geolocation", //定位控件，用来获取和展示用户主机所在的经纬度位置
        "AMap.CloudDataSearch",//高德云图
        "AMap.ToolBar"
    ],
    uiVersion: '1.0.11' // 版本号
});
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [List.name]: List,
    [Card.name]: Card,
    [Field.name]: Field,
    [NavBar.name]: NavBar,
    [Search.name]: Search,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [CellGroup.name]: CellGroup,
    [PullRefresh.name]: PullRefresh
  },
  data() {
      let self = this
      return {
          list: [],
          value:'',
          zoom: 15,
          show:false,
          loading: false,
          changeIndex:0,
          finished: false,
          isLoading: false,   //是否处于下拉刷新状态
          rows:6,//每页显示的个数
          pageNumber: 1,//当前显示页数
          totalPage: 0,
          columns: [],
          columnsShow:false,
          sortList:["分类","附近","排序"],
          center: [121.59996, 31.197646],
          lng: null,
          lat: null,
          categoryId:null,
          amapManager,
          loaded: false,
          plugin: [{
              pName: 'Geolocation',
              events: {
                  init(o) {
                      // o 是高德地图定位插件实例
                      o.getCurrentPosition((status, result) => {
                          console.log(status)
                          if (result && result.position) {
                              self.lng = result.position.lng;
                              self.lat = result.position.lat;
                              self.center = [self.lng, self.lat];
                              self.loaded = true;
                              self.$nextTick();
                          }else {
                              alert("定位失败")
                          }
                      });
                  }
              }
          }]
      };
  },

  methods: {
      init(pushObj) {
          let data = {
              pageNumber: this.pageNumber + 1
          };
          let self = this;
          this.$axios.post("/api/goods/shopGoods",qs.stringify({ "page":self.pageNumber,"rows":this.rows,pushObj })).then(res=>{
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
              this.$axios.post("/api/goods/shopGoods",qs.stringify({ "page":self.pageNumber,"rows":this.rows,"shopId":sessionStorage.shopIndexId })).then(res=>{
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
      },
      sortSearch(index){
          console.log(this.lat)
        this.columnsShow = true
        let distance=["不限","1公里","3公里","5公里","10公里","20公里"]
        let sortList=["不限","距离","积分"]
        this.$axios.post("/api/shop/category",).then(res=>{
            console.log(res)
            let category = []
            this.columns = []
            for (var i in res.data.resData) {
                this.categoryId = res.data.resData[i].id
                category.push(res.data.resData[i].categoryName)
            }
            switch (index){
                case 0:
                    this.columns = category
                    break;
                case 1:
                    this.columns = distance
                    break;
                case 2:
                    this.columns = sortList
                    break;
            }
            this.changeIndex = index
            this.show = true
        })
      },
      // 选择搜索排序
      onConfirm(value,index) {
          let i = this.changeIndex
          this.show = false
          self.list = []
          let pushObj =
              {
                  "name":value,
                  "lat":this.lat,
                  "lng":this.lng
              }
          this.init(pushObj)
          this.sortList[i] = value
          this.columnsShow = false
      },
      // 取消
      onCancel(){
          this.show = false
          this.columnsShow = false
      },
      onSearch(){
          self.list = []
          let pushObj =
              {
                  "name":this.value,
                  "lat":this.lat,
                  "lng":this.lng
              }
          this.init(pushObj)
      },
      onCancels(){
        return false
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
    /*分类查询*/
.sort-search-contant{
    height: .7rem;
    line-height: .7rem;
    display: flex;
    justify-content: space-around;
    color: #666;
    margin-bottom: .3rem;
    background: #fff;
    position: relative;
}
.van-popup{
  width: 100%;
}
</style>
