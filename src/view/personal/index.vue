<template>
  <div class="contain">
    <!--<van-nav-bar-->
            <!--title="志愿者中心"-->
    <!--/>-->
    <img class="user-poster" src="../../static/images/personal.png">
    <div class="val-persnal-title">
      <div class="val-img-title">
        <van-uploader :after-read="onRead">
          <img :src="fileImg">
        </van-uploader>
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
import { Row, Col, Icon, Cell, CellGroup,NavBar,Uploader } from 'vant';
import qs from 'qs'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [NavBar.name]: NavBar,
    [Uploader.name]: Uploader,
    [CellGroup.name]: CellGroup
  },
  data() {
      return {
          id: null,
          realName:null,
          rank:null,
          intergral:null,
          dataObj:{},
          fileImg:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QCmRXhpZgAATU0AKgAAAAgABgE+AAUAAAACAAAAVgE/AAUAAAAGAAAAZgMBAAUAAAABAAAAllEQAAEAAAABAQAAAFERAAQAAAABAAALElESAAQAAAABAAALEgAAAAAAAHomAAGGoAAAgIQAAYagAAD6AAABhqAAAIDoAAGGoAAAdTAAAYagAADqYAABhqAAADqYAAGGoAAAF3AAAYagAAGGoAAAsY//2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAC0ALQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDaooornPlQooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKs2thd3pItraSXHUquQPxqzJ4f1aNCzWE2B6DP8qdmWqc2rpGbRSkFWKsCCOCD2pKRAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVv+GdBGqztNcA/ZYjgj++fSsCvVNCtBZaLaxAclA7fU8mqgrs7MFRVWp72yL0UUcEaxxIqIowFUYAp9FFbHvGPrmgW+rQMyqqXSj5JAOvsfavNJI3ilaORSroSrA9iK9jrzzxlaC31rzVGBOgc/Xof6VnNdTy8woK3tF8znaKKKzPJCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK9hg5t4yP7g/lXj1eo+Hr1b7RLeTPzIvluPQjitKZ6eWySlKJqUUUVoeuFcT48/wCPiyH+w38xXbV5x4uvVu9baNDlYFEeffqamexxY+SVG3cwaKKKxPCCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK3PDWt/wBk3hSYn7NKQH/2T2NZUFldXP8AqLaaX/cQmiayurb/AF9tNH/voRTV1qaU5TptTj0PXUdZEV0YMrDIZTkEUteWadruoaYNtvN+7/55uMr/APWrQn8Z6rLHtQQRH+8iHP6k1pzo9aOY03G8lqdV4h1yPSbQqjBrqQYjX09z7V5ozF2LMSWJySe9SO893OXcvLKx5J5Jqb+ytQ8vzPsNzs9fKOKhts8/EVp4iV7aIqUUrKyMVdSrDqCMGkqTlCiiigAooooAKKKKACiiigAooooAKKKKACiiigByKXdUUZZjgCvR9M8L6fYxIZYVnnxlnkGRn2HSuM8NWv2vXrZCPlQ+Yfw5/nivT60gup6uX0YyTnJCKoVQqgADoAKCAwIYAg9QaWitD1Tmta8JW94jTWKrDcD+EcK/+BrB03whfXNzi8Q28Kn5jkEn6f416HRUuKbOSeCpTnzWKljptpp0QS1gVOOWxyfqat0UVR1KKirIrXVhaXq7bm3jl92Xn864PxPoUWkzRS2xPkS5G087SK9FrC8W2v2nQZXA+aEiQfyP6Gpkro5cXRjOm3bVHm9FFFYngBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAGho2o/2VqkV0VLIPlcDqVPWvRrXWtOvVBhu4iSM7WbB/I15TRVRlY68Pi50VZK6PZeoyKK8ihvru3I8m5mjx02uRV2PxLrEX3b6Q/7wDfzFXzo7Y5lD7UWeoUV5uPF+sAczRn6xinf8Jjq//PWL/v2KOdF/2jR8z0aivNH8Way//L2F/wB2Nf8ACqk2t6nOCJL6cg9QHIH6Uc6JeZU+iZ6lNcQ267ppUjHXLsBXK+JfElpJYSWVnIJnl4Z1+6o+veuKd3kbc7MzerHNNqXO5zVcwlOLjFWuFFFFQeeFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/9k='
      };
  },
  methods: {
      onRead(e) {
          console.log(this.id)
          // this.fileImg = file.content
          let file = e.file;
          let param = new FormData(); //创建form对象
          let id = this.$cookies.get("uid")
          param.append('file',file,file.name);//通过append向form对象添加数据
          param.append('chunk','0');//添加form表单中其他数据
          param.append('id',id);
          let that = this
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload=function(e){
              that.fileImg = this.result
          }
          let config = {
              headers:{'Content-Type':'multipart/form-data'}
          };  //添加请求头
          this.$axios.post("/api/upload/img/volunteer",param,config).then(res=>{
              console.log(res)
              let picId = res.data.resData.pictureId
              sessionStorage.pictureId = picId
          })
      }
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
        width: 1.82rem;
        height: 1.82rem;
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
