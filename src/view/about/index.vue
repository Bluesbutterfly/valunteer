<template>
  <div>
    <!--<van-nav-bar-->
            <!--title="关于我们"-->
            <!--left-arrow-->
    <!--/>-->
    <van-cell-group class="van-cell-top">
      <van-row type="flex" justify="center" class="van-top-img">
        <img src="../../static/images/img_logo.png">
      </van-row>
      <van-row  class="van-top-title">
        关注“嘉定新城（马陆镇）爱心公益志愿服务”，帮助您第一时间了解嘉定新城（马陆镇）社区志愿服务中心工作动态，获取各项志愿服务活动信息，携手发扬“奉献、友爱、互助、进步”的志愿服务精神！
      </van-row>
      <van-row class="intro-maintext">
        <p>地址：宝安公路3322号419室</p>
        <p>联系电话：59156773</p>
      </van-row>
    </van-cell-group>
    <!--<div class="van-footer">-->
      <!--当前版本 ：1.1.0-->
    <!--</div>-->
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup,NavBar,List } from 'vant';
const data = require('../../static/json/datatest').menuRoot.children
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [List.name]: List,
    [NavBar.name]: NavBar,
    [CellGroup.name]: CellGroup
  },
    data() {
        return {
            list: [],
            loading: false,
            finished: false
        };
    },

    methods: {
        onLoad() {
            setTimeout(() => {
                for (let i = 0; i < data.length; i++) {
                    this.list.push(data[i]);
                }
                this.loading = false;
            }, 500);
        }
    }
};
</script>

<style lang="less" scoped>
p{
  padding: 0;
  margin: 0;
}
.van-cell{
  font-size: .28rem;
  line-height: .48rem;
}
.van-nav-bar__text{
  color: inherit;
}
.van-cell-top{
  padding: 2.84rem .3rem 0;
  background-color: transparent;
  .van-top-img{
    img{
      width: 1.26rem;
      height: 1.26rem;
    }
  }
  .van-top-title{
    font-size: .26rem;
    padding-top: .84rem;
    color: #919199;
    text-indent: 2em;
    line-height: .52rem;
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
  &-nav-bar{
    font-size: .4rem;
    /deep/ .van-icon{
      color: #666;
    }
    /deep/ .van-nav-bar__title{
      font-size: .4rem;
    }
  }
  &-cell__value--alone{
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
    .van-lists{
      padding: 0;
      margin-bottom: .8rem;
      display: flex;
    }
  }
  /*页脚*/
  &-footer{
    position: fixed;
    text-align: center;
    width: 100%;
    color: #919199;
    font-size: .26rem;
    bottom: .44rem;
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
.intro-maintext{
  color: #919199;
  font-size: 0.26rem;
  line-height: 0.52rem;
  position: fixed;
  bottom: 7em;
  right: 0;
  padding: 0 .3rem;
  text-align: right;
}
</style>
