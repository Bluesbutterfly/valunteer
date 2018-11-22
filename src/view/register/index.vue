<template>
  <div class="goods">
    <h2>注册志愿者</h2>
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

      <!--<div class="val-task-icon">-->
        <!--<img src="../../static/images/icon_yanzhengma.png">-->
        <!--验证码-->
      <!--</div>-->
      <!--<van-field-->
              <!--placeholder="请输入短信验证码"-->
              <!--v-model="data.code"-->
              <!--type="tel"-->
              <!--:error-message="errorMsg.message"-->
              <!--clearable-->
              <!--maxlength="10"-->
      <!--&gt;-->
        <!--<van-button slot="button" size="small" type="primary" @click="sendPhone" :disabled="data.disabled">{{ data.btn }}</van-button>-->
      <!--</van-field>-->

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
    <van-button size="normal" type="primary" @click="register">注册</van-button>
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
              types:"注册",
              time:"",
              determine:false,
              determines:false,
              disabled:false,
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
          console.log(phoneNum)
          self.data.determine = false
          let msgErr = reg.test(phoneNum);
          if(phoneNum == ""){
              self.errorMsg.mobile = ""
              self.errorSpace.mobile = true
          }else{
              self.errorSpace.mobile = false
              if(!msgErr){
                  self.errorMsg.mobile = "手机号格式错误"
              }else {
                  self.data.determine = true
                  self.errorMsg.mobile = ""
              }
          }

          console.log(this.data.determine)
      },2000),
      // 短信验证码
      sendPhone (){
        let _this = this;
        _this.data.disabled = true;
        _this.data.time = 60;
        let set = setInterval(()=>{
            _this.data.time --;
            if (_this.data.time == 0){
                _this.data.btn = "获取验证码"
                _this.data.disabled = false
                clearInterval(set)
            }else {
                _this.data.btn = "重新发送"+_this.data.time
                _this.data.disabled = true
            }
        },1000)
      },
      // 密码的验证
      // validate_password: _debounce(function (_type, index, item){
      //     let passwordPattern=/^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z\d]{6,16}$/,
      //         t,
      //         pass = this.data.pass,
      //         self = this;
      //     self.data.determines = false
      //     clearTimeout(t)
      //     t = setTimeout(function (){
      //         if(!passwordPattern.test(pass)){
      //             self.errorMsg.pass = "请输入6-16位字母加数字的密码"
      //         } else {
      //             self.data.determines = true
      //             self.errorMsg.pass = ""
      //         }
      //
      //         console.log(self.data.determines)
      //     }, 1000);
      //
      // }),
      // 注册
      register(){
          // console.log("账号"+this.phone+"密码"+this.phone )
          // console.log(this.data.determine)
          if (this.data.determine == false || this.data.phone == undefined || this.data.pass == undefined){
              this.errorMsg.subErr = "账号密码不能为空"
          } else {
              this.errorMsg.subErr = ""
              this.$axios.post("/api/volunteer/register",qs.stringify({ "phone":this.data.phone,"password":this.data.pass })).then(res=>{
                  console.log(res)
                  sessionStorage.valunum = -2
                  let phoneNum = this.data.phone,
                      timeOut = this.data.time,
                      rescode = res.data.resCode
                  let error = res.data.resMessage
                  this.errorMsg.subErr = error
                  if (timeOut < 0){
                      this.errorMsg.message = "验证码已过期，请重新验证"
                  }else {
                      this.errorMsg.message = ""
                  }
                  console.log(rescode)
                  if (rescode == 1){
                      this.$router.push({name:'loginsuc',query:this.data})
                  }
              }).catch(err=>{
                  console.log(err)
              })
          }

      }
  }
};
</script>

<style lang="less" scoped>
.van{
  /*标题字体*/
  &-nav-bar__title{
    font-size: .4rem;
  }
  &-nav-bar &-icon{
    color: #666;
  }
}
.goods {
  padding-bottom: 1rem;
  background-color: #fff;
  min-height: 100vh;
  box-sizing: border-box;
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
    box-sizing: content-box;
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
    margin-top: 1.1rem;
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
}
</style>
