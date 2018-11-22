<template>
  <div class="goods">
    <h2>您好，志愿者用户</h2>
    <van-cell-group>
      <div class="val-task-icon">
        <img src="../../static/images/icon_shouji.png">
        手机
      </div>
      <van-field
              placeholder="请输入手机号"
              v-model="data.phone"
              :error-message="errorMsg.mobile"
              :error="errorSpace.mobile"
              @input="inputPhone"
              maxlength="12"
      />

      <div class="val-task-icon">
        <img src="../../static/images/icon_mima.png">
        密码
      </div>
      <van-field
              type="password"
              placeholder="请输入密码"
              v-model="data.pass"
              maxlength="18"
      />
    </van-cell-group>
    <div class="van-field__error-message" style="text-align: center;">{{ errorMsg.subErr }}</div>
    <div class="val-register-href clearfix">
      <router-link  to="/register/">注册</router-link>
    </div>
    <van-button size="normal" type="primary" @click="login">登录</van-button>
  </div>
</template>

<script>
import {
  field,
  CellGroup,
  NumberKeyboard,
  button,
  row,
  col
} from 'vant';
import qs from 'qs'
import {store} from "../../static/js/store";
// 防抖
export function _debounce(fn, delay) {

    var delay = delay || 200;
    var timer;
    return function () {
        var th = this;
        var args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            timer = null;
            fn.apply(th, args);
        }, delay);
    };
}
export default {
  components: {
    [CellGroup.name]: CellGroup,
    [field.name]: field,
    [row.name]: row,
    [col.name]: col,
    [button.name]: button,
    [NumberKeyboard.name]: NumberKeyboard
  },

  data() {
    return {
      data: {
          user:"商户",
          phone:null,
          pass:null,
          code:null,
          btn:"获取验证码",
          types:"登录",
          time:"",
          disabled:false
      },
      errorMsg: {
          mobile: '',
          message: '',
          pass: '',
          subErr:''
      },
      errorSpace: {
          mobile: false
      }
    };
  },

  methods: {
      // 手机号码校验方法
      inputPhone:  _debounce(function (_type, index, item) {
          let reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/,
              phoneNum = this.data.phone,
              self = this;
          // console.log(phoneNum)
          let msgErr = reg.test(phoneNum);
          if(phoneNum == ""){
              self.errorMsg.mobile = ""
              self.errorSpace.mobile = true
          }else{
              self.errorSpace.mobile = false
              if(!msgErr){
                  self.errorMsg.mobile = "手机号格式错误"
              }else {
                  self.errorMsg.mobile = ""
              }
          }
      },2000),
      // 密码的验证
      // validate_password: _debounce(function (_type, index, item){
      //     let passwordPattern=/^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z\d]{6,16}$/,
      //         t,
      //         pass = this.data.pass,
      //         self = this;
      //     clearTimeout(t)
      //     t = setTimeout(function (){
      //         if(!passwordPattern.test(pass)){
      //             self.errorMsg.pass = "请输入6-16位字母加数字的密码"
      //         } else {
      //             self.errorMsg.pass = ""
      //         }
      //     }, 1000);
      //
      // }),
      // 登录
      login(){
          if (this.data.phone == null || this.data.pass == null){
              this.errorMsg.subErr = "账号密码不能为空"
          }else {
              this.errorMsg.subErr = ""
              this.$axios.post("/api/volunteer/login",qs.stringify({ "phone":this.data.phone,"password":this.data.pass })).then(res=>{
                  console.log(res)
                  if (res.data.resCode == -1){
                      this.errorMsg.subErr = "用户名或密码错误"
                  } else {
                      sessionStorage.intergral = res.data.resData.intergral;
                      // localStorage.setItem("token",res.data.resData.id)
                      //将登录id存入cookies
                      this.$cookies.set("uid" , res.data.resData.id , 30 * 60)
                      let getSign = res.data.resData.status
                      console.log(getSign)
                      // 如果没有进行审核进入登记页面进行登记
                      if (getSign != 3){
                          sessionStorage.duge = 5
                          if (getSign == 2){
                              sessionStorage.valunum = 6;
                          }else if (getSign == 4){
                              sessionStorage.valunum = 7;
                          }
                      }
                      if (sessionStorage.duge == 0) {
                          sessionStorage.valunum = 0;
                      }else if (sessionStorage.duge == 1) {
                          sessionStorage.valunum = 4;
                      }else if (sessionStorage.duge == 5) {
                          sessionStorage.valunum = 5;
                      }else {
                          sessionStorage.valunum = 3;
                      }
                      this.$emit('login',res.data.resData.id);
                      this.$router.push({name:'loginsuc',query:this.data})
                  }
              }).catch(err=>{
                  console.log(err)
              })
          }

      },
      goBack () {
          window.history.length > 1
              ? this.$router.go(-1)
              : this.$router.push('/')
      }
  }
};
</script>

<style lang="less" scoped>
.goods {
  padding-bottom: 1rem;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #fff;
  h2{
    text-align: center;
    padding: 1.14rem 0;
    margin: 0;
  }
  .van-button--primary{
    width: 2rem;
    height: .6rem;
    line-height: .6rem;
    border-radius: 20px;
    background-color: transparent;
    border: 1px solid #BBBBBC;
    color: #BBBBBC;
  }
  .van-button--normal{
    width: 2.04rem;
    height: .84rem;
    display: block;
    margin: 0 auto ;
    background-color: #58BF8A;
    border: 1px solid #58BF8A;
    color: #fff;
    border-radius: 50px;
    margin-top: .8rem;
  }
  .van-cell{
    padding: .2rem .84rem .2rem 1.36rem;
  }
  .val-task-icon{
    padding: .4rem .78rem;
    box-sizing: border-box;
    line-height: 24px;
    color: #434343;
    font-size: 14px;
    overflow: hidden;
    align-items: center;
    display: flex;
    img{
      width: .3rem;
      margin-right: .28rem;
    }
  }
  .val-register-href{
    font-size: 14px;
    a{
      float: right;
      margin: .6rem .84rem 0 0;
      color: #58BF8A;
    }
  }
  .clearfix {
    &:before,
    &:after {
      content: " ";
      display: table;
    }
    &:after {
      clear: both;
    }
  }
}
</style>
