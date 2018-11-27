<template>
  <div>
      <van-cell-group>
        <img src="../../static/images/topcell.png" alt="背景图片" style="width: 100%;">
        <van-row class="whrite-msg">
          请填写登记信息（以下信息可在个人中心维护）
        </van-row>
        <van-row>
          <van-field
                  label="真实姓名"
                  placeholder="请输入"
                  v-model="realName"
                  :error-message="errorMsg.real"
          />
          <van-field
                  label="年龄"
                  placeholder="请输入"
                  v-model="age"
                  :error-message="errorMsg.age"
          />
          <van-field
                  label="身份证号"
                  placeholder="请输入"
                  v-model="idCard"
                  :error-message="errorMsg.idCard"
          />
          <van-radio-group v-model="radio" class="van-cell van-hairline van-field">
            <div class="van-cell__title">
              <label>性别</label>
            </div>
            <div class="van-cell__value van-field__body">
              <van-radio name="1">男</van-radio>
              <van-radio name="2">女</van-radio>
            </div>
          </van-radio-group>
          <van-field
                  label="职业"
                  placeholder="请输入"
                  v-model="doing"
          />
          <van-field
                  label="居住地址"
                  placeholder="请输入"
                  v-model="address"
          />
          <van-field
                  label="工作单位"
                  placeholder="请输入"
                  v-model="workAdress"
          />
          <van-field
                  label="志愿者编号"
                  placeholder="请输入"
                  v-model="userNum"
          />
          <van-field
                  label="服务时长（小时）"
                  placeholder="请输入"
                  v-model="timeLength"
          />
          <van-field
                  label="手机"
                  placeholder="请输入"
                  v-model="tel"
          />
          <van-field
                  label="政治面貌"
                  placeholder="请输入"
                  v-model="politicsStatus"
          />
          <van-field
                  label="民族"
                  placeholder="请输入"
                  v-model="nation"
          />
          <van-field
                  label="最高学历"
                  placeholder="请输入"
                  v-model="highestEducation"
          />
          <van-field
                  label="从业状况"
                  placeholder="请输入"
                  v-model="workingConditions"
          />
          <van-field
                  label="服务意向"
                  placeholder="请输入"
                  v-model="serviceIntention"
          />
        </van-row>
      </van-cell-group>
    <van-button size="normal" type="primary" @click="submit">提交</van-button>
  </div>
</template>

<script>
    import { Row, Col, Icon, Cell, CellGroup,NavBar,Card,List,Field,Button,Radio,RadioGroup } from 'vant';
    import qs from 'qs'
    import { store,getLogin } from '../../static/js/store'
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
            [Row.name]: Row,
            [Col.name]: Col,
            [Radio.name]: Radio,
            [Icon.name]: Icon,
            [Cell.name]: Cell,
            [List.name]: List,
            [Card.name]: Card,
            [Field.name]: Field,
            [Button.name]: Button,
            [NavBar.name]: NavBar,
            [CellGroup.name]: CellGroup,
            [RadioGroup.name]: RadioGroup
        },
        data() {
            return {
                radio:"1",
                realName:"",
                age:"",
                idCard:"",
                tel:"",
                politicsStatus:"",
                nation:"",
                highestEducation:"",
                workingConditions:"",
                serviceIntention:"",
                doing:"",
                address:"",
                workAdress:"",
                userNum:"",
                timeLength:"",
                errorMsg:{
                    real:"",
                    age:"",
                    idCard:""
                }
            };
        },
        beforeCreate:function(){
            // this.$store.set("key",1)
            // getLogin()
            let uid = this.$cookies.get("uid")
            this.$axios.post("/api/volunteer/myInfo",qs.stringify({"id":uid})).then(res=>{
              console.log(res)
                this.realName = res.data.resData.realName
                this.age = res.data.resData.age
                this.idCard = res.data.resData.idNumber
                this.radio = res.data.resData.gender.toString()
                this.doing = res.data.resData.remark
                this.address = res.data.resData.address
                this.workAdress = res.data.resData.workUnit
                this.userNum = res.data.resData.volunteerNo
                this.timeLength = res.data.resData.workHours
            })
        },
        methods: {
            submit:function(index){
                let uid = this.$cookies.get("uid")
                let setMsg = {
                    id:uid,
                    gender:this.radio,
                    realName:this.realName,
                    age:this.age,
                    idNumber:this.idCard,
                    remark:this.doing,
                    address:this.address,
                    workUnit:this.workAdress,
                    volunteerNo:this.userNum,
                    workHours:this.timeLength,
                    Phone:this.tel,
                    politicsStatus:this.politicsStatus,
                    nation:this.nation,
                    highestEducation:this.highestEducation,
                    workingConditions:this.workingConditions,
                    serviceIntention:this.serviceIntention
                }
                // let getMsg = this.$cookies.get("getMsg")
                if (setMsg.realName == ""){
                    this.errorMsg.real = "此项为必填项"
                }
                if (setMsg.age == ""){
                    this.errorMsg.age = "此项为必填项"
                }
                if (setMsg.idNumber == ""){
                    this.errorMsg.idCard = "此项为必填项"
                }
                this.$axios.post("/api/volunteer/modifyMyInfo",qs.stringify(setMsg)).then(res=>{
                    let judge = sessionStorage.targets
                    if (judge == 0){
                        this.$router.push({name:'personal'})
                    }else if(judge == 1){
                        this.$router.push({name:'commodityDetails'})
                    }else if(judge == 2){
                        this.$router.push({name:'act'})
                    }
                }).catch(err=>{
                    console.log(err)
                })

                // this.$router.push({name:'change',query:this.listData[index]})
            }
        }
    };
</script>

<style lang="less" scoped>
p{
  margin: 0;
}
.whrite-msg{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.van{
  &-col{
    float: none;
  }
  &-nav-bar{
    font-size: .4rem;
    height: .92rem;
    line-height: .92rem;
    /deep/ .van-icon{
      color: #666;
    }
    /deep/ .van-nav-bar__title{
      font-size: .4rem;
    }
  }
  /*标题字体*/
  &-nav-bar__title{
    font-size: .4rem;
  }
  &-nav-bar &-icon{
    color: #666;
  }
  &-cell-group{
    padding: .3rem .4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: .84rem;
  }
  &-set-submit{
    display: flex;
    flex-direction: column;
    align-items: center;
    p{
      font-size: .24rem;
      color: #898989;
      text-align: center;
    }
    button{
      width: 6.6rem;
      height: .84rem;
      line-height: .84rem;
      background-color: #58BF8A;
      border-color: #58BF8A;
      font-size: .32rem;
      color: #fff;
      margin-top: .32rem;
    }
  }
  //单选按钮
  &-radio{
    padding-right: .2rem;
  }
  /deep/
  &-cell__title {
    max-width: 120px;
  }
  //提交
  &-button--normal{
    float: right;
    background-color: #58BF8A;
    border: 1px solid #58BF8A;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>
