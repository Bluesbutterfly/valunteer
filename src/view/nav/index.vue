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
      <div class="spance"></div>
      <div class="mapSelect">
        <ul>
          <li v-for="(item,index) in mapSelect"><van-button @click="selectMap(index,mapLat, mapLng, mapAddress)">{{ item }}</van-button></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup,NavBar,Rate,Button } from 'vant';
import qs from 'qs'
import wx from 'weixin-js-sdk';
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Rate.name]: Rate,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [CellGroup.name]: CellGroup
  },
  data() {
      return {
          mapAddress:"",
          mapLat:[],
          mapLng:[],
          browser:{},
          mapSelect:["百度地图","高德地图","腾讯地图","苹果地图"],
          showMain:true,
          showTip:false
      };
  },
  mounted:function(){
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          //是微信
          this.showTip = true
          this.showMain = false
      } else {
          this.showTip = false
          this.showMain = true
      }
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
      let mapNum = window.location.href.split("?")[1].split("&")
      this.mapAddress = decodeURI(mapNum[0].split("=")[1])
      this.mapLat = mapNum[1].split("=")[1]
      this.mapLng = mapNum[2].split("=")[1]
  },
  methods:{
      selectMap(index,lat, lng, addr){
          let ua = this.browser.ua;
// 地图uri api数组
          var uri = new Array();
          if (ua.android) {
// 百度地图uri api
              uri[0] = "bdapp://map/navi?location=" + lat + "," + lng + "&query="
                  + addr;
// 高德地图uri api
              uri[1] = "androidamap://navi?sourceApplication=xlwx&poiname=" + addr
                  + "&lat=" + lat + "&lon=" + lng + "&dev=1&style=2";
// 腾讯地图uri api
              uri[2] = "qqmap://map/marker?marker=coord:" + lat + "," + lng
                  + ";title:" + addr + "&referer=xlwx";
          } else if (ua.iOS) {
// 百度地图uri api
              uri[0] = "baidumap://map/navi?location=" + lat + "," + lng + "&query="
                  + addr;
// 高德地图uri api
              uri[1] = "iosamap://navi?sourceApplication=xlwx&poiname=" + addr
                  + "&lat=" + lat + "&lon=" + lng + "&dev=1&style=2";
// 腾讯地图uri api
              uri[2] = "qqmap://map/marker?marker=coord:" + lat + "," + lng
                  + ";title:" + addr + "&referer=xlwx";
// 苹果地图uri api
              uri[3] = "http://maps.apple.com/?q=Mexican+Restaurant&sll=" + lat + "," + lng + "&address="
                  + addr;
          }
//调用uri
          if(uri.length == 0){
              return;
          }
          switch(index)
          {
              case 0:
                  window.location.href = uri[0];
                  break;
              case 1:
                  window.location.href = uri[1];
                  break;
              case 2:
                  window.location.href = uri[2];
                  break;
              case 3:
                  window.location.href = uri[3];
                  break;
          }
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
  &-comment{
    .van-head-img{
      display: flex;
      font-size: .24rem;
      color: #434343;
      p{
        line-height: .45rem;
      }
      p:last-child{
        color: #BBBBBC;
      }
      img{
        width: 0.82rem;
        height: 0.82rem;
        border-radius: 50%;
        box-sizing: border-box;
        margin-right: .4rem;
      }
    }
    >div:first-child{
      font-size: .32rem;
      color: #434343;
    }
  }
  &-comment-contain{
    font-size: .28rem;
    color: #898989;
    padding: .3rem 0 .6rem;
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
