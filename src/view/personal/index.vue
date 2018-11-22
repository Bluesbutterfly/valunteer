<template>
  <div class="contain">
    <!--<van-nav-bar-->
            <!--title="志愿者中心"-->
    <!--/>-->
    <img class="user-poster" src="../../static/images/personal.png">
    <div class="val-persnal-title">
      <div class="val-img-title">
        <img src="../../static/images/people.jpg">
      </div>
      <div class="val-vitrl-name">{{ realName }}</div>
      <div class="val-info">
        <div>
          <img src="../../static/images/icon_dengji.png">志愿者等级 <span>{{ rank }}</span>
        </div>
        <div>
          <img src="../../static/images/icon_jifen2.png">我的积分 <span>{{ intergral }}</span>
        </div>
      </div>
    </div>
    <van-cell-group>
      <router-link :to="{path:'/setout/',query: {dataObj: dataObj}}">
        <van-cell>
          <img src="../../static/images/icon_jifen2.png" class="van-cell__left-icon">
          <div class="van-cell__title"><span>个人资料</span></div>
          <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
        </van-cell>
      </router-link>

      <router-link  to="/sign/">
        <van-cell>
          <img src="../../static/images/icon_jifen2.png" class="van-cell__left-icon">
          <div class="van-cell__title"><span>志愿者登记</span></div>
          <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
        </van-cell>
      </router-link>

      <router-link  to="/order/">
        <van-cell class="van-cell-opty">
          <img src="../../static/images/icon_jifen2.png" class="van-cell__left-icon">
          <div class="van-cell__title"><span>我的订单</span></div>
          <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
        </van-cell>
      </router-link>

      <router-link  to="/set/">
        <van-cell>
          <img src="../../static/images/icon_jifen2.png" class="van-cell__left-icon">
          <div class="van-cell__title"><span>设置</span></div>
          <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
        </van-cell>
      </router-link>

      <router-link  to="/about/">
        <van-cell>
          <img src="../../static/images/icon_jifen2.png" class="van-cell__left-icon">
          <div class="van-cell__title"><span>关于</span></div>
          <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
        </van-cell>
      </router-link>

    </van-cell-group>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup,NavBar } from 'vant';
import qs from 'qs'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [NavBar.name]: NavBar,
    [CellGroup.name]: CellGroup
  },
  data() {
      return {
          id: null,
          realName:null,
          rank:null,
          intergral:null,
          dataObj:{}
      };
  },
  methods: {

  },
  beforeMount:function () {
    let uid = this.$cookies.get("uid")
        // loginName = this.$cookies.get("loginName")
      this.id = uid
      if (!uid){
          this.$router.push({name:'login'})
      }else {
          this.$router.push({name:'personal'})
      }
      // this.$axios.post("/api/loginStatus/userStatus",qs.stringify({ "userStatus":1,"phone":loginName })).then(res=>{
      //
      // })
  },
  mounted:function () {
      sessionStorage.duge = 0
      sessionStorage.targets = 0
      this.$axios.post("/api/volunteer/myInfo",qs.stringify({ "id":this.id })).then(res=>{
          console.log(res)
          this.dataObj = res.data.resData
          this.realName = res.data.resData.realName
          this.rank = res.data.resData.rank
          this.intergral = res.data.resData.intergral
          sessionStorage.realName = res.data.resData.realName
          sessionStorage.phone = res.data.resData.phone
          sessionStorage.gender = res.data.resData.gender
          sessionStorage.age = res.data.resData.age
          sessionStorage.volunteerNo = res.data.resData.volunteerNo
          // console.log(this.dataObj)
      })
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
  &-nav-bar &-icon{
    color: #666;
  }
}
.van-cell{
  font-size: .28rem;
  line-height: .8rem;
  padding: .2rem .3rem;
  /deep/
  .van-cell__value{
    display: -webkit-box;
    .van-icon-arrow{
      font-size: .24rem;
    }
    img{
      width: .32rem;
      margin-right: .2rem;
    }
  }
}
.van-hairline--top-bottom::after{
  border-top-width: 0;
}
.van-cell-opty{
  margin-bottom: .6rem;
}
.user {
  &-poster {
    width: 100%;
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
    top: -1.25rem;
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
