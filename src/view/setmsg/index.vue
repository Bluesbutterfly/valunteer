<template>
  <div>
    <!--<van-nav-bar-->
            <!--title="设置"-->
            <!--left-arrow-->
    <!--/>-->
    <van-cell-group>
        <van-field
                v-model="value"
                type="password"
                placeholder="请输入新密码"
        />

        <van-field
                v-model="nValue"
                type="password"
                placeholder="请确认新密码"
        />
    </van-cell-group>
    <div class="van-field__error-message" style="text-align: center;">{{ subErr }}</div>
    <div class="van-set-submit">
      <p>密码为8-16位数字、字母和符号组成，不可以为纯数字</p>

      <van-button size="large" @click="submitPassWord">提交</van-button>
    </div>
  </div>
</template>

<script>
    import { Row, Col, Icon, Cell, CellGroup,NavBar,Card,List,Field,Button } from 'vant';
    import qs from 'qs'

    export default {
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Icon.name]: Icon,
            [Cell.name]: Cell,
            [List.name]: List,
            [Card.name]: Card,
            [Field.name]: Field,
            [Button.name]: Button,
            [NavBar.name]: NavBar,
            [CellGroup.name]: CellGroup
        },
        data() {
            return {
                value: "",
                nValue: "",
                subErr:""
            };
        },

        methods: {
            submitPassWord () {
                let uid = this.$cookies.get("uid")
                if (this.value == "" || this.nValue == ""){
                    return false
                }else if (this.value != this.nValue){
                    this.subErr = "两次密码不一致"
                }  else {
                    this.$axios.post("/api/volunteer/modifyPassword",qs.stringify({ "id":uid,"volPassword":this.nValue })).then(res=>{
                        console.log(res)
                        window.history.length > 1
                            ? this.$router.go(-1)
                            : this.$router.push('/')
                    })
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
  &-nav-bar{
    font-size: .4rem;
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
    margin: .2rem 0;
    .van-cell{
      padding: .3rem;
    }
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
}
</style>
