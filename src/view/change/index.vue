<template>
  <div>
    <!--<van-nav-bar-->
            <!--:title="this.$route.query.title"-->
            <!--left-arrow-->
            <!--@click-left="goBack"-->
    <!--/>-->
    <van-cell-group>
        <van-field
                v-model="value"
                :placeholder="'请输入'+this.$route.query.title"
        />
    </van-cell-group>
    <div class="van-set-submit">
      <van-button size="large" @click="subSet">提交</van-button>
    </div>
  </div>
</template>

<script>
    import { Row, Col, Icon, Cell, CellGroup,NavBar,Card,List,Field,Button } from 'vant';
    import qs from 'qs'
    import {router} from "../../router";
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
                gender:""
            };
        },
        methods: {
            subSet() {
                let zindex = sessionStorage.zindex
                switch (zindex) {
                    case '0':
                        sessionStorage.realName = this.value
                        break;
                    case '1':
                        sessionStorage.phone = this.value
                        break;
                    case '2':
                        if (this.value == "男"){
                            sessionStorage.gender = 0
                        } else  if (this.value == "女"){
                            sessionStorage.gender = 1
                        }
                        break;
                    case '3':
                        sessionStorage.age = this.value
                        break;
                    default:
                        sessionStorage.volunteerNo = this.value

                }
                let uid = this.$cookies.get("uid")
                if (this.value == "" || null){
                    return false
                } else {
                    this.$axios.post("/api/volunteer/modifyMyInfo",qs.stringify({ "volPassword":"","id":uid,"realName":sessionStorage.realName,"phone":sessionStorage.phone,"gender":sessionStorage.gender,"age":sessionStorage.age,"volunteerNo":sessionStorage.volunteerNo })).then(res=>{
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
