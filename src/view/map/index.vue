<template>
  <div class="amap-page-container">
    <div :style="{width:'100%',height:'100vh'}">
      <!--搜索框-->
      <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result.prevent="onSearchResult"></el-amap-search-box>
      <el-amap vid="amap" :plugin="plugin" :amap-manager="amapManager" class="amap-demo" :center="center" :zoom="zoom">
        <!--<el-amap-marker v-for="(marker, index) in markers" :position="marker.marker" :icon="centerImg" :events="markerClick"></el-amap-marker>-->
        <!--<el-amap-circle :center="circle.center" :radius="circle.radius" :fillOpacity="circle.fillOpacity" :events="circle.events" :strokeColor="circle.strokeColor" :strokeStyle="circle.strokeStyle" :fillColor="circle.fillColor"></el-amap-circle>-->
      </el-amap>
    </div>
    <!--商户位置信息-->
    <div class="van-destination" v-if="show" @click="targetApp">
      <div class="van-now-position">
        <img class="user-poster" :src="centerImg">
        <div class="van-user">
          <div class="van-shoping-name">
            {{ names }}
          </div>
          <div>
            {{ distance }}<span>{{ address }}</span>
          </div>
          <div>
            <van-rate
                    v-model="value"
                    :size="12"
                    :count="5"
                    disabled-color="#ED7043"
                    void-color="#ceefe8"
                    disabled
            />
            <!--<span>2000</span>人去过-->
          </div>
          <div>
            <img src="../../static/images/icon_shijian.png">营业时间:<span class="van-timer-shop" :alt="mapHour">{{ mapHour }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueAMap from 'vue-amap';
  import { Rate,Button,Icon } from 'vant';
  import wx from 'weixin-js-sdk';
  import $ from 'jquery'
  import qs from 'qs'
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
          [Rate.name]: Rate,
          [Icon.name]: Icon,
          [Button.name]: Button,
      },
      props: {
          input: String
      },
      data(){
          const self = this;
          return {
              center: [121.25599709999999, 31.326800100000003],
              zoom: 15,
              centerImg:'',
              lng: 0,
              lat: 0,
              nlng: 0,
              nlat: 0,
              names:null,
              address:null,
              distance:null,
              loaded: false,
              mapHour:null,
              value: 5,
              show:false,
              amapManager,
              searchOption: {
                  city: '上海',
                  citylimit: true
              },
              plugin: [
          //         {
          //         enableHighAccuracy: true,//是否使用高精度定位，默认:true
          //         timeout: 100,          //超过10秒后停止定位，默认：无穷大
          //         maximumAge: 0,           //定位结果缓存0毫秒，默认：0
          //         convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          //         showButton: true,        //显示定位按钮，默认：true
          //         buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
          //         showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
          //         showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
          //         panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
          //         zoomToAccuracy:true,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
          //         extensions:'all',
          //         pName: 'Geolocation',
          //         events: {
          //             init(o) {
          //                 // console.log(o)
          //                 // o 是高德地图定位插件实例
          //                 o.getCurrentPosition((status, result) => {
          //                     console.log(result)
          //                     if (result && result.position) {
          //                         self.lng = result.position.lng;
          //                         self.lat = result.position.lat;
          //                         self.center = [self.lng, self.lat];
          //                         self.loaded = true;
          //                         self.$nextTick();
          //                     }
          //                 });
          //             }
          //         }
          // }
          ,{
                  // key: 'ef670a4970a138af8a2fba72cbae3594',
                  pageSize: 10,
                  resizeEnable: true,
                  zoom: 10,
                  pName: 'CloudDataSearch',
                  events:{
                      init (cloud){
                          // console.log(cloud)
                          AMap.service(["AMap.CloudDataLayer"], function(){
                              let layerOptions = {
                                  query: {
                                      keywords: ""
                                  },
                                  clickable: true
                              };
                              let cloudDataLayer = new AMap.CloudDataLayer("5bc941ce305a2a1c2a6e8643", layerOptions);
                              let map=amapManager.getMap();
                              cloudDataLayer.setMap(map); //添加到地图
                              AMap.event.addListener(cloudDataLayer, 'click', function(result) {
                                  let clouddata = result.data;
                                  console.log(clouddata)
                                  // sessionStorage.mapCenter = [clouddata._location.lng,clouddata._location.lat]
                                  sessionStorage.mapLngs = clouddata._location.lng
                                  sessionStorage.mapLats = clouddata._location.lat
                                  // sessionStorage.mapNames = self.names
                                  self.show = true
                                  let cpoint = [clouddata._location.lng,clouddata._location.lat],
                                      dis = Math.round(AMap.GeometryUtil.distance(self.center, cpoint));
                                  if (dis>500){
                                      self.distance = Math.round(dis/1000) + "公里"
                                  }else {
                                      self.distance = dis + "米"
                                  }
                                  self.names = clouddata._name
                                  self.address = clouddata._address
                                  self.$axios.post("/api/shop/shopDetail",qs.stringify({ "id":clouddata.shop_id })).then(res=>{
                                      let numMarker = res.data.resData
                                      self.mapHour = numMarker.businessHours
                                      if (typeof numMarker.image != "object"){
                                          self.centerImg = 'http://47.99.140.207:8081/'+numMarker.image
                                      }else {
                                          self.centerImg = 'http://47.99.140.207:8081/'+numMarker.image.pictureAddress
                                      }
                                      sessionStorage.centerImg = self.centerImg
                                      sessionStorage.mapHour = self.mapHour
                                      sessionStorage.shop_id= clouddata.shop_id
                                  })
                              //     var infoWindow = new AMap.InfoWindow({
                              //         content: "<h3><font>" +
                              //     clouddata._name + "</font></h3><hr>地址：" +
                              //     clouddata._address + "<br>" + "创建时间：" +
                              //     clouddata.shop_id + "<br>" + "更新时间：" +
                              //     clouddata._updatetime,
                              //         size: new AMap.Size(300, 0),
                              //         autoMove: true,
                              //         offset: new AMap.Pixel(0, -25)
                              // });
                              //     infoWindow.open(map, clouddata._location);
                              });
                          })
                      }
                  }
              },{
                      pName: 'ToolBar',
                      events: {
                          init(instance) {
                          }
                      }
                  }]
          }
      },
      methods: {
          onSearchResult(pois) {
              let latSum = 0;
              let lngSum = 0;
              if (pois.length > 0) {
                  pois.forEach(poi => {
                      let {lng, lat} = poi;
                      lngSum += lng;
                      latSum += lat;
                      // this.markers.push([poi.lng, poi.lat]);
                  });
                  let center = {
                      lng: lngSum / pois.length,
                      lat: latSum / pois.length
                  };
                  this.center = [center.lng, center.lat];
              }
          },
          targetApp (event){
              sessionStorage.mapName = this.names
              sessionStorage.mapDistance = this.distance
              sessionStorage.mapAddress = this.address
              sessionStorage.mapValue = this.value
              sessionStorage.mapLng = this.lng
              sessionStorage.mapLat = this.lat
              this.$router.push({ name: 'merchat'})
          }
      }
  }
</script>

<style lang="less" scoped>
body{
  margin: 0;
}
p{
  margin: 0;
}
.van{
  &-destination{
    position: absolute;
    width: 6.52rem;
    height: 3rem;
    background-color: #fff;
    left: 50%;
    bottom: .56rem;
    transform: translateX(-50%);
    z-index: 10000;
  }
  &-now-position{
    padding: .4rem .4rem;
    display: flex;
    font-size: .24rem;
    .van-user{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 3.9rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .van-shoping-name{
        font-size: .42rem;
      }
      >div:nth-child(2){
        font-size: .28rem;
        span{
          padding-left: .28rem;
        }
      }
      >div:nth-child(3){
        display: flex;
        .van-rate{
          padding-right: .3rem;
        }
      }
      img{
        width: .22rem;
        height: .22rem;
        padding-right: .22rem;
      }
    }
  }
}
.user-poster{
  width: 1.94rem;
  height: 1.94rem;
  border-radius: 5px;
  margin-right: .3rem;
  object-fit: cover;
}
/*搜索*/
.amap-page-container{
  position: relative;
  .search-box {
    position: absolute;
    width: 7.12rem;
    height: .76rem;
    top: .2rem;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 20px;
    color: #D3D3DF;
    .van-icon-search{
        padding: 0 .22rem 0 .3rem;
    }
    .search-box-wrapper{
        input{
            height: .4rem;
            line-height: .4rem;
            font-size: .24rem;
            color: #242424;
            /*text-indent: 0;*/
        }
    }
  }
}
.amap-demo{
  /deep/ .amap-icon img{
    width: .5rem;
    height: .68rem;
  }
}
</style>
