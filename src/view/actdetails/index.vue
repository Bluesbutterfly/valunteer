<template>
  <div>
    <!--<van-nav-bar-->
            <!--title="服务活动"-->
            <!--left-arrow-->
    <!--/>-->
    <van-cell-group class="van-act-details">
      <img class="user-poster" :src="picSrc">
      <div>
        <div>
          {{ content }}
        </div>
        <div>
          <img src="../../static/images/icon_shijian.png">{{ createTime }}
        </div>
        <div>
          <img src="../../static/images/icon_weizhi.png">{{ address }}
        </div>
        <!--<div>-->
          <!-- - -->
        <!--</div>-->
        <!--<div>-->
          <!--本次活动需志愿者全程听从现场工作人员的指挥安排，摆放物品，收拾整理等，保证活动顺利开展。-->
        <!--</div>-->
      </div>
    </van-cell-group>
    <!--<van-cell-group class="van-user-list">-->
      <!--<p>已报名用户</p>-->
      <!--<ul>-->
        <!--<li><img src="../../static/images/u=2537627520,3119182571&fm=27&gp=0.jpg"></li>-->
        <!--<li><img src="../../static/images/u=2537627520,3119182571&fm=27&gp=0.jpg"></li>-->
        <!--<li><img src="../../static/images/u=2537627520,3119182571&fm=27&gp=0.jpg"></li>-->
        <!--<li><img src="../../static/images/u=2537627520,3119182571&fm=27&gp=0.jpg"></li>-->
        <!--<li><img src="../../static/images/u=2537627520,3119182571&fm=27&gp=0.jpg"></li>-->
        <!--<li><img src="../../static/images/u=2537627520,3119182571&fm=27&gp=0.jpg"></li>-->
        <!--<li><img src="../../static/images/u=2537627520,3119182571&fm=27&gp=0.jpg"></li>-->
        <!--<li><img src="../../static/images/u=2537627520,3119182571&fm=27&gp=0.jpg"></li>-->
      <!--</ul>-->
    <!--</van-cell-group>-->
    <!--<van-cell-group class="van-comment">-->
      <!--<van-cell>-->
        <!--<span>1</span>条评论-->
      <!--</van-cell>-->
      <!--<van-cell>-->
        <!--<div class="van-head-img">-->
          <!--<div>-->
            <!--<img src="../../static/images/u=2537627520,3119182571&fm=27&gp=0.jpg">-->
          <!--</div>-->
          <!--<div>-->
            <!--<p>Design</p>-->
            <!--<p><span>2</span>分钟前</p>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="van-comment-contain">-->
          <!--好赞！！-->
        <!--</div>-->
      <!--</van-cell>-->
    <!--</van-cell-group>-->
    <div class="spance"></div>
    <van-cell class="van-sure-primary">
      <div>
        <div><img src="../../static/images/icon_liuyan.png"></div>
        <div>留言</div>
      </div>
      <van-button size="large" @click="actSign">我要报名</van-button>
    </van-cell>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup,NavBar,Button } from 'vant';
import qs from 'qs'
import moment from 'moment'

export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [CellGroup.name]: CellGroup
  },
  data() {
      return {
          id: 2,
          volunteerId:500,
          address:sessionStorage.address,
          content:sessionStorage.content,
          picSrc:sessionStorage.picSrc,
          createTime:""
      };
  },
  methods:{
      actSign (){
          sessionStorage.duge = 1
          sessionStorage.targets = 2
          let uid = this.$cookies.get("uid")
              // loginName = this.$cookies.get("loginName")
          this.id = uid
          if (!uid){
              this.$router.push({name:'login'})
          }else {
              this.$axios.post("/api/activity/applyActivity",qs.stringify({ "activityId":sessionStorage.activityId,"volunteerId":uid })).then(res=>{
                  console.log(res)
                  alert("已成功报名")
                  this.$router.push({name:'servelist'})
              })
          }
          // this.$axios.post("/api/loginStatus/userStatus",qs.stringify({ "userStatus":1,"phone":loginName })).then(res=>{
          //
          // })
      }
  },
    mounted:function () {
      console.log(sessionStorage.createTime)
        let year = new Date(moment(sessionStorage.createTime)).getFullYear()
        let mouth = new Date(moment(sessionStorage.createTime)).getMonth()
        let date = new Date(moment(sessionStorage.createTime)).getDate()
        let day = new Date(moment(sessionStorage.createTime)).getDay()
        var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
        this.createTime = mouth+"月"+date+"号"+" "+weekday[day]
        console.log(this.createTime)
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
  /deep/ &-cell{
    padding: 0 .3rem;
    line-height: normal;
  }
  /deep/ &-nav-bar &-icon{
    color: #666;
  }
  &-cell-group{
    margin-bottom: .2rem;
  }
  /*活动描述*/
  &-act-details{
    font-size: .24rem;
    color: #898989;
    >div{
      padding: .4rem .4rem .6rem;
      >div{
        line-height: .5rem;
        img{
          height: .22rem;
          padding-right: .22rem;
        }
      }
      >div:first-child{
        font-size: .42rem;
        color: #302F2F;
        font-weight: bold;
        padding-bottom: .3rem;
      }
      >div:nth-child(4){
        padding-top: .5rem;
      }
    }
  }
  /*报名用户列表*/
  &-user-list{
    padding: .4rem;
    font-size: .32rem;
    color: #434343;
    ul{
      display: flex;
      margin-top: .82rem;
      li:last-child{
        img{
          margin-right: 0;
        }
      }
      img{
        width: .72rem;
        height: .72rem;
        border-radius: 50%;
        margin-right: .14rem;
      }
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
      padding: .2rem .3rem;
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
}
.spance{
  height: 1rem;
}
</style>
